import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerShellComponent } from './components/customer-shell/customer-shell.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'customers',
        component: CustomersListComponent,
      },
    ],
  },
  {
    path: 'customer',
    component: CustomerShellComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
