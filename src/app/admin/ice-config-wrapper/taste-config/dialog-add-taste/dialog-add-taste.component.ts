import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-dialog-add-taste',
  templateUrl: './dialog-add-taste.component.html',
  styleUrls: ['./dialog-add-taste.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddTasteComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogAddTasteComponent>,
    private formBuild: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  cancelDialog(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.adminService
      .postTaste(this.form.get('name')!.value)
      .subscribe((msg) => console.log(msg.body));

    this.cancelDialog();
  }

  private createForm() {
    this.form = this.formBuild.group({
      name: this.formBuild.control({ value: '', disabled: false }, [
        Validators.minLength(3),
        Validators.required,
      ]),
    });
  }
}
