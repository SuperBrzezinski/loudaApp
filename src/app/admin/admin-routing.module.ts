import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminGuard } from '../shared/guard/admin.guard';
import { CustomersListComponent } from './customers-list/customers-list.component';
const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'customers',
        component: CustomersListComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
