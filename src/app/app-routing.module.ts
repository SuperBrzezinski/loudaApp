import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
