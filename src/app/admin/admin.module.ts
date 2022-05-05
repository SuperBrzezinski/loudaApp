import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerTableComponent } from './customers-list/customer-table/customer-table.component';
import { DialogAddCustomerComponent } from './customers-list/dialog-add-customer/dialog-add-customer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
  declarations: [
    AdminShellComponent,
    CustomersListComponent,
    CustomerTableComponent,
    DialogAddCustomerComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
