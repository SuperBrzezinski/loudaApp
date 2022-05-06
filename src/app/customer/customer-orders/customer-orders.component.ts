import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { add, format } from 'date-fns';
import { first, map, Observable, startWith } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { selectUserName } from 'src/app/state/user/user.selectors';

// export interface User {
//   name: string;
// }

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
  form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.init();
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

    // console.log(recipeTemp);

    this.apiService.postOrder(orderTemp, this.tomorrowDate);
  }

  private init() {
    this.store
      .select(selectUserName)
      .pipe(first())
      .subscribe((name) => {
        this.customerName = name as string;
        console.log(this.customerName);
      });

    this.apiService.getTastes().subscribe((tastes) => {
      this.possibleTastes = tastes;
    });

    this.apiService.getUnits().subscribe((units) => {
      this.possibleUnits = units;
    });

    this.createForm();
  }

  private createForm() {
    this.form = this.formBuild.group({
      // customerName: this.formBuild.control({ value: '', disabled: false }, [
      //   Validators.minLength(3),
      //   Validators.required,
      // ]),
      // description: this.formBuild.control({ value: '', disabled: false }, [
      //   Validators.minLength(10),
      //   Validators.required,
      // ]),
      formItems: this.formBuild.array([
        this.formBuild.group({
          taste: ['', [Validators.required, Validators.minLength(3)]],
          unit: ['', Validators.required],
          quantity: ['', Validators.required],
        }),
      ]),
      // rating: this.formBuild.control(3),
      // imageUrl: this.formBuild.control({ value: '', disabled: false }, [
      //   Validators.minLength(5),
      //   Validators.required,
      // ]),
    });
  }
}
