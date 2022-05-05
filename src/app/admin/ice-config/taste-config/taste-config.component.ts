import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../../customers-list/dialog-add-customer/dialog-add-customer.component';
import { DialogAddTasteComponent } from './dialog-add-taste/dialog-add-taste.component';

@Component({
  selector: 'app-taste-config',
  templateUrl: './taste-config.component.html',
  styleUrls: ['./taste-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteConfigComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddTasteComponent, {
      width: '600px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
