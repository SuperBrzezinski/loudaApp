import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';

@NgModule({
  declarations: [CustomerShellComponent, CustomerOrdersComponent],
  imports: [CommonModule, CustomerRoutingModule, AngularMaterialModule],
})
export class CustomerModule {}
