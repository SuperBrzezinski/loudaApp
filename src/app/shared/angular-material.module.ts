import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
const angularMaterial = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatDividerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, angularMaterial],
  exports: angularMaterial,
})
export class AngularMaterialModule {}
