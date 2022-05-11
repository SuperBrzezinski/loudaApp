import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit {
  form!: FormGroup;

  possibleTastes$: Observable<string[]> = this.customerService.getTastes();
  possibleUnits$: Observable<string[]> = this.customerService.getUnits();
  possibleFavourites$ = this.customerService.getFavourites();
  customerLastOrderDate = this.customerService.getCustomerLastOrderDate;

  constructor(
    private formBuild: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  get formItems() {
    return this.form.get('formItems') as FormArray;
  }

  itemFormGroup(): FormGroup {
    return this.formBuild.group({
      taste: ['', [Validators.required, Validators.minLength(3)]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  addFormItem(): void {
    this.formItems.push(this.itemFormGroup());
  }

  removeFormItem(index: number): void {
    if (index === 0) return;
    this.formItems.removeAt(index);
  }

  addToFavourites(index: number): void {
    this.customerService.addToFavourites(this.formItems.at(index).value);
  }

  chooseFavourite(index: number, item: IceCreamItem) {
    this.formItems.at(index).get('taste')?.setValue(item.taste);
    this.formItems.at(index).get('unit')?.setValue(item.unit);
    this.formItems.at(index).get('quantity')?.setValue(item.quantity);
    this.changeDetectionRef.markForCheck();
  }

  onSubmit() {
    this.customerService.postOrder({
      customerName: this.customerService.getCustomerName,
      items: this.formItems.value,
    });
  }

  loadLastOrder(): void {
    this.customerService
      .getUserLastOrderItems()
      .pipe(take(1))
      .subscribe((items) => {
        this.form = this.form = this.formBuild.group({
          formItems: this.formBuild.array([]),
        });
        items.forEach((item) => {
          this.formItems.push(
            this.formBuild.group({
              taste: [
                item.taste,
                [Validators.required, Validators.minLength(3)],
              ],
              unit: [item.unit, [Validators.required]],
              quantity: [item.quantity, [Validators.required]],
            })
          );
        });
        this.changeDetectionRef.markForCheck();
      });
  }

  private createForm() {
    this.form = this.formBuild.group({
      formItems: this.formBuild.array([
        this.formBuild.group({
          taste: ['', [Validators.required, Validators.minLength(3)]],
          unit: ['', Validators.required],
          quantity: [
            '1',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
        }),
      ]),
    });
  }
}
