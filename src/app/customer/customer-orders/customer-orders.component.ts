import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { add, format } from 'date-fns';
import { first, map, take } from 'rxjs';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import {
  selectUserLastOrderDate,
  selectUserName,
  selectUserUid,
} from 'src/app/state/user/user.selectors';

interface CustomerLastOrderItem {
  taste: string;
  amount: string;
}

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrdersComponent implements OnInit {
  tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );
  possibleTastes!: string[];
  possibleUnits!: string[];
  private customerName!: string;
  private customerUid!: string;
  private customerLastOrderDate!: string;
  public customerLastOrderItems!: CustomerLastOrderItem[];
  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>,
    private formBuild: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  get isTodaysOrderPlaced() {
    return this.customerLastOrderDate === this.tomorrowDate;
  }

  get formItems() {
    return this.form.get('formItems') as FormArray;
  }

  itemFormGroup(): FormGroup {
    return this.formBuild.group({
      taste: ['', [Validators.required, Validators.minLength(3)]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  addFormItem() {
    this.formItems.push(this.itemFormGroup());
  }

  removeFormItem(index: number) {
    if (index === 0) return;
    this.formItems.removeAt(index);
  }

  onSubmit() {
    console.log('sending');
    let orderTemp: Order = {
      customerName: this.customerName,
      items: this.formItems.value,
    };
    this.apiService.postOrder(orderTemp, this.tomorrowDate);

    let lastOrder = { date: this.tomorrowDate, items: this.formItems.value };
    this.apiService.postUserLastOrder(this.customerUid, lastOrder);
  }

  loadLastOrder(): void {
    // let lastOrderedItems: IceCreamItem[] = [];
    this.apiService
      .getUserLastOrderItems(this.customerUid)
      .pipe(take(1))
      .subscribe((items) => {
        console.log(items);

        this.form = this.form = this.formBuild.group({
          formItems: this.formBuild.array([
            // this.formBuild.group({
            //   taste: ['', [Validators.required, Validators.minLength(3)]],
            //   unit: ['', Validators.required],
            //   quantity: ['', Validators.required],
            // }),
          ]),
        });
        items.forEach((item) => {
          this.formItems.push(
            this.formBuild.group({
              taste: [
                item.taste,
                [Validators.required, Validators.minLength(3)],
              ],
              unit: [item.unit, [Validators.required]],
              quantity: [String(item.quantity), [Validators.required]],
            })
          );
        });
        this.changeDetectionRef.markForCheck();
      });
  }

  private init() {
    this.store
      .select(selectUserName)
      .pipe(first())
      .subscribe((name) => {
        this.customerName = name as string;
        console.log(this.customerName);
      });

    this.store.select(selectUserUid).subscribe((uid) => {
      this.customerUid = uid as string;
    });

    this.store.select(selectUserLastOrderDate).subscribe((date) => {
      this.customerLastOrderDate = date as string;
      console.log(date);
    });

    this.apiService.getTastes().subscribe((tastes) => {
      this.possibleTastes = tastes;
    });

    this.apiService.getUnits().subscribe((units) => {
      this.possibleUnits = units;
    });

    this.apiService
      .getUserLastOrderItems(this.customerUid)
      .pipe(
        map((iceCreamItems) => {
          return iceCreamItems.map((iceCreamItem) => {
            return {
              taste: iceCreamItem.taste,
              amount: String(
                Number(iceCreamItem.unit) * Number(iceCreamItem.quantity)
              ),
            };
          });
        })
      )
      .subscribe((lastOrderedItems) => {
        console.log(lastOrderedItems);

        this.customerLastOrderItems = lastOrderedItems;
        this.changeDetectionRef.markForCheck();
      });

    this.createForm();
  }

  private createForm() {
    this.form = this.formBuild.group({
      formItems: this.formBuild.array([
        this.formBuild.group({
          taste: ['', [Validators.required, Validators.minLength(3)]],
          unit: ['', Validators.required],
          quantity: ['', Validators.required],
        }),
      ]),
    });
  }
}
