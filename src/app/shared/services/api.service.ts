import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<User[]> {
    return this.db.list<User>('users').valueChanges();
  }

  postUser(uid: string, user: User) {
    this.db.object('users/' + uid).set(user);
  }

  getTastes(): Observable<string[]> {
    return this.db.list<string>('ice/tastes').valueChanges();
  }

  postTaste(tasteName: string) {
    this.db.list<string>('ice/tastes').push(tasteName);
  }

  getUnits(): Observable<string[]> {
    return this.db.list<string>('ice/units').valueChanges();
  }

  postUnit(unitValue: string) {
    this.db.list<string>('ice/units').push(unitValue);
  }
}
