import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { IceConfigComponent } from './ice-config/ice-config.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    children: [
      {
        path: 'customers',
        component: CustomersListComponent,
      },
      {
        path: 'config',
        component: IceConfigComponent,
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
