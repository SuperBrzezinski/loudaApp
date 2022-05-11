import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logIn, logOut, removeRole } from 'src/app/state/user/user.actions';
import { Role } from '../models/role.model';
import { ApiService } from './api.service';
import { take } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from 'src/app/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  userRole!: any;
  storeVar!: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

        // JSON.parse(localStorage.getItem('user')!);
        // this.testapi
        //   .getUserRole(user.uid)
        //   .snapshotChanges()
        //   .subscribe((role) => {
        //     console.log(role.payload.toJSON());
        //     this.userRole = role;
        //     // console.log(this.userRole);

        //     localStorage.setItem('role', JSON.stringify(this.userRole.payload));
        //     // JSON.parse(localStorage.getItem('role')!);
        //   });
        // console.log(JSON.parse(localStorage.getItem('user')!));
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('role', 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.apiService
          .getObjectAsObservavble<User>(`users/${result.user?.uid}`)
          .pipe(take(1))
          .subscribe((user) => {
            localStorage.setItem('role', JSON.stringify(user!.role));
            this.store.dispatch(
              logIn({
                uid: result.user!.uid,
                name: user!.name,
                role: user!.role,
                lastOrderDate:
                  user!.lastOrder?.date === undefined
                    ? null
                    : user!.lastOrder.date,
              })
            );
            this.ngZone.run(() => {
              this.router.navigate(['admin']);
            });
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // commented out to be able to login as unverified user
    // return user !== null && user.emailVerified !== false ? true : false;
    // return user !== null && user.emailVerified !== false ? true : true;
    return user !== null;
  }
  get isAdmin(): boolean {
    return JSON.parse(localStorage.getItem('role')!) === 'admin';
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.store.dispatch(logOut());
      this.store.dispatch(removeRole());
      this.router.navigate(['sign-in']);
    });
  }
}
