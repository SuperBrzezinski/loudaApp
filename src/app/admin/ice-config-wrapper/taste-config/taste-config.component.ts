import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTasteComponent } from './dialog-add-taste/dialog-add-taste.component';

@Component({
  selector: 'app-taste-config',
  templateUrl: './taste-config.component.html',
  styleUrls: ['./taste-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteConfigComponent {
  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddTasteComponent, {
      width: '600px',
    });
  }
}
