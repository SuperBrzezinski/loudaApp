import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dialog-add-unit',
  templateUrl: './dialog-add-unit.component.html',
  styleUrls: ['./dialog-add-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUnitComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogAddUnitComponent>,
    private formBuild: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  cancelDialog(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.apiService.postUnit(this.form.get('value')!.value);
    this.cancelDialog();
  }

  private createForm() {
    this.form = this.formBuild.group({
      value: this.formBuild.control({ value: '', disabled: false }, [
        Validators.pattern('^[0-9]*$'),
        Validators.required,
      ]),
    });
  }
}
