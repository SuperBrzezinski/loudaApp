import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './admin-customer-wrapper.html',
  styleUrls: ['./admin-customer-wrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomerWrapperComponent {
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCustomerComponent, {
      width: '600px',
    });
  }
}
