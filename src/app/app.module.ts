import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
const angularFire = [
  AngularMaterialModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule,
];
import { environment } from '../environments/environment';

import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { AuthService } from './shared/services/auth.service';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducer';

@NgModule({
  declarations: [AppComponent, SignInComponent],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AdminModule,
    CustomerModule,
    angularFire,
    StoreModule.forRoot({ user: userReducer }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
