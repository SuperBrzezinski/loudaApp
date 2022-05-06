import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerShellComponent,
    canActivate: [],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
