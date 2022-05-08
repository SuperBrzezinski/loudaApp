import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CustomerShellComponent,
    children: [{ path: 'order', component: CustomerOrdersComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
