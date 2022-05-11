import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { IceAmountPipe } from './pipes/ice-amount.pipe';

@NgModule({
  declarations: [IceAmountPipe],
  imports: [CommonModule, AngularMaterialModule],
  exports: [AngularMaterialModule, IceAmountPipe],
})
export class SharedModule {}
