import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CustomerOrdersWrapperComponent } from './customer-orders-wrapper/customer-orders-wrapper.component';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { FavouritesComponent } from './favourites/favourites.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CustomerShellComponent,
    children: [
      { path: 'order', component: CustomerOrdersWrapperComponent },
      { path: 'favourites', component: FavouritesComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
