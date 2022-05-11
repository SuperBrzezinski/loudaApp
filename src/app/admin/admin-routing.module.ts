import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../shared/guard/admin.guard';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { AdminCustomerWrapperComponent } from './admin-customer-wrapper/admin-customer-wrapper';
import { IceConfigWrapperComponent } from './ice-config-wrapper/ice-config-wrapper.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminGuard],
    component: AdminShellComponent,
    children: [
      {
        path: 'customers',
        component: AdminCustomerWrapperComponent,
      },
      {
        path: 'config',
        component: IceConfigWrapperComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
