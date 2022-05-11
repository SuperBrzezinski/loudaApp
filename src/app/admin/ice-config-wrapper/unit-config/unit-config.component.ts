import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUnitComponent } from './dialog-add-unit/dialog-add-unit.component';

@Component({
  selector: 'app-unit-config',
  templateUrl: './unit-config.component.html',
  styleUrls: ['./unit-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitConfigComponent {
  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUnitComponent, {
      width: '600px',
    });
  }
}
