import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CustomerOrdersWrapperComponent } from './customer-orders-wrapper/customer-orders-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FavouritesComponent } from './favourites/favourites.component';
import { OrderFormComponent } from './customer-orders-wrapper/order-form/order-form.component';
import { PlacedOrderComponent } from './customer-orders-wrapper/placed-order/placed-order.component';

@NgModule({
  declarations: [
    CustomerShellComponent,
    CustomerOrdersWrapperComponent,
    FavouritesComponent,
    OrderFormComponent,
    PlacedOrderComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CustomerModule {}
