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
import { IceConfigComponent } from './ice-config/ice-config.component';
import { TasteConfigComponent } from './ice-config/taste-config/taste-config.component';
import { TasteTableComponent } from './ice-config/taste-config/taste-table/taste-table.component';
import { DialogAddTasteComponent } from './ice-config/taste-config/dialog-add-taste/dialog-add-taste.component';
import { UnitConfigComponent } from './ice-config/unit-config/unit-config.component';
import { UnitTableComponent } from './ice-config/unit-config/unit-table/unit-table.component';
import { DialogAddUnitComponent } from './ice-config/unit-config/dialog-add-unit/dialog-add-unit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { SumupTableComponent } from './orders/sumup-table/sumup-table.component';

@NgModule({
  declarations: [
    AdminShellComponent,
    CustomersListComponent,
    CustomerTableComponent,
    DialogAddCustomerComponent,
    IceConfigComponent,
    TasteConfigComponent,
    TasteTableComponent,
    DialogAddTasteComponent,
    UnitConfigComponent,
    UnitTableComponent,
    DialogAddUnitComponent,
    OrdersComponent,
    OrdersTableComponent,
    SumupTableComponent,
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
