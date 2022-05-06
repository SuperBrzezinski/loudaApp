import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerShellComponent,
    children: [{ path: 'order', component: CustomerOrdersComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
