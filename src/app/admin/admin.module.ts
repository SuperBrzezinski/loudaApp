import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminShellComponent } from './admin-shell/admin-shell.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerTableComponent } from './customers-list/customer-table/customer-table.component';
import { DialogAddCustomerComponent } from './customers-list/dialog-add-customer/dialog-add-customer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

//Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
const angularMaterialImports = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    AdminShellComponent,
    CustomersListComponent,
    CustomerTableComponent,
    DialogAddCustomerComponent,
  ],
  imports: [
    CommonModule,
    angularMaterialImports,
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
