import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class TestapiService {
  shizzleList!: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  getShizzle() {
    this.shizzleList = this.db.list('users/clients');
    return this.shizzleList;
  }
}
