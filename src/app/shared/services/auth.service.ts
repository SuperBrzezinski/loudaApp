import { Injectable, NgZone } from '@angular/core';
// import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { TestapiService } from 'src/app/testapi.service';
import { Store } from '@ngrx/store';
import { logIn, logOut, removeRole } from 'src/app/state/user/user.actions';
import { Role } from '../models/role.model';
import { UserState } from 'src/app/state/user/user.reducer';
import { ApiService } from './api.service';
import { first } from 'rxjs';

interface DbUser {
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  userRole!: any;
  storeVar!: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private testapi: TestapiService,
    private apiService: ApiService,
    private store: Store<{ role: Role }>
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
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // console.log(result);

        this.apiService
          .getUser(result.user!.uid)
          .pipe(first())
          .subscribe((user) => {
            this.store.dispatch(
              logIn({ uid: result.user!.uid, name: user.name, role: user.role })
            );
            this.ngZone.run(() => {
              this.router.navigate(['admin']);
            });
          });

        // this.testapi
        //   .getUserRole(result.user!.uid)
        //   .snapshotChanges()
        //   .subscribe((role) => {
        //     console.log(role.payload.toJSON());
        //     this.userRole = role;
        //     // console.log(this.userRole);

        //     localStorage.setItem('role', JSON.stringify(this.userRole.payload));
        //     this.store.dispatch(logIn({ name: role.payload }));
        //     // this.store.dispatch(
        //     //   addRole({ role: role.payload.exportVal() as Role })
        //     // );
        //     this.ngZone.run(() => {
        //       this.router.navigate(['admin']);
        //     });
        //   });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  // SignUp(email: string, password: string) {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       // commented out to be able to login as unverified user
  //       // this.SendVerificationMail();
  //       // this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }
  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }
  // Reset Forggot password
  // ForgotPassword(passwordResetEmail: string) {
  //   return this.afAuth
  //     .sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       window.alert('Password reset email sent, check your inbox.');
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
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
  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     if (res) {
  //       this.router.navigate(['dashboard']);
  //     }
  //   });
  // }
  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     // displayName: user.displayName,
  //     // photoURL: user.photoURL,
  //     // commented out to be able to login as unverified user
  //     // emailVerified: user.emailVerified,
  //     // emailVerified: true,
  //     role: 'admin',
  //   };
  //   // this.testapi.getUserRole(user.uid);
  //   // return userRef.set(userData, {
  //   //   merge: true,
  //   // });
  // }
  // Sign out
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
