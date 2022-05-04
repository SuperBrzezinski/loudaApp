import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

// export interface dbUser {
//   role: string;
// }

@Injectable({
  providedIn: 'root',
})
export class TestapiService {
  shizzleList!: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}

  getShizzle() {
    this.shizzleList = this.db.list('users/clients');
    this.db.object('users').update('gowno');
    return this.shizzleList;
  }

  deleteShizzle() {
    console.log('robie delete');

    this.db.object('test/0').remove();
  }

  postShizzle() {
    console.log('robie post');
    this.db.list('test/').push({ chuj: 'chuj' });
    this.db.object('test/' + 'uid').set({ chuj: 'kutas' });
  }

  getUserRole(uid: string) {
    return this.db.object('users/' + uid + '/role');
  }

  // getUserRole(uid: string) {
  //   return this.db
  //     .list('users')
  //     .snapshotChanges()
  //     .subscribe((users) => {
  //       console.log(users);

  //       let parsedUsers: any[] = [];
  //       users.forEach((user) => {
  //         parsedUsers.push(user.payload.toJSON());
  //       });
  //       console.log(parsedUsers);
  //     });
  // }
  // getUserRole(uid: string) {
  //   function isAnDbUser(obj: any): obj is dbUser {
  //     return 'role' in obj && true;
  //   }
  //   let parsedUser: dbUser;
  //   this.db
  //     .object('users/' + uid)
  //     .snapshotChanges()
  //     .subscribe((user) => {
  //       let tempUser;
  //       tempUser = user.payload.toJSON()
  //       if (isAnDbUser(tempUser)) {
  //         parsedUser = user.payload.toJSON(
  //       }
  //       );
  //       // if (parsedUser instanceof dbUser) return parsedUser.role;
  //     });
  //   return null;
  // }
}
