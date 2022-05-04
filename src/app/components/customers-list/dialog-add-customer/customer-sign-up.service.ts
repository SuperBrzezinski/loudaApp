import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerSignUpService {
  constructor(
    private afAuth: AngularFireAuth,
    private apiService: ApiService
  ) {}

  public signUp(name: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.apiService.postUser(result.user!.uid, {
          name: name,
          email: email,
          role: 'customer',
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
