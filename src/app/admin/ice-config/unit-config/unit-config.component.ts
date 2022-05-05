import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUnitComponent } from './dialog-add-unit/dialog-add-unit.component';

@Component({
  selector: 'app-unit-config',
  templateUrl: './unit-config.component.html',
  styleUrls: ['./unit-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitConfigComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUnitComponent, {
      width: '600px',
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
