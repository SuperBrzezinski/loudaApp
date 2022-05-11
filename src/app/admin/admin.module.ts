import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { AdminCustomerWrapperComponent } from './admin-customer-wrapper/admin-customer-wrapper';
import { CustomerTableComponent } from './admin-customer-wrapper/customer-table/customer-table.component';
import { DialogAddCustomerComponent } from './admin-customer-wrapper/dialog-add-customer/dialog-add-customer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { IceConfigWrapperComponent } from './ice-config-wrapper/ice-config-wrapper.component';
import { TasteConfigComponent } from './ice-config-wrapper/taste-config/taste-config.component';
import { TasteTableComponent } from './ice-config-wrapper/taste-config/taste-table/taste-table.component';
import { DialogAddTasteComponent } from './ice-config-wrapper/taste-config/dialog-add-taste/dialog-add-taste.component';
import { UnitConfigComponent } from './ice-config-wrapper/unit-config/unit-config.component';
import { UnitTableComponent } from './ice-config-wrapper/unit-config/unit-table/unit-table.component';
import { DialogAddUnitComponent } from './ice-config-wrapper/unit-config/dialog-add-unit/dialog-add-unit.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { SumupTableComponent } from './orders/sumup-table/sumup-table.component';
import { IceAmountPipe } from '../shared/pipes/ice-amount.pipe';

@NgModule({
  declarations: [
    AdminShellComponent,
    AdminCustomerWrapperComponent,
    CustomerTableComponent,
    DialogAddCustomerComponent,
    IceConfigWrapperComponent,
    TasteConfigComponent,
    TasteTableComponent,
    DialogAddTasteComponent,
    UnitConfigComponent,
    UnitTableComponent,
    DialogAddUnitComponent,
    OrdersComponent,
    OrdersTableComponent,
    SumupTableComponent,
    IceAmountPipe,
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
