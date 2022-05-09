import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerSignUpService } from './customer-sign-up.service';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddCustomerComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>,
    private formBuild: FormBuilder,
    private customerSignUpService: CustomerSignUpService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.customerSignUpService.signUp(
      this.form.get('name')!.value,
      this.form.get('email')!.value,
      this.form.get('password')!.value
    );
    this.cancelDialog();
  }

  private createForm() {
    this.form = this.formBuild.group({
      name: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(5),
        Validators.email,
        Validators.required,
      ]),
      password: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }
}
