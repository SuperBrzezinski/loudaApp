import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  getListAsObservable<T>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

  getListAsSnapshotActionObservable<T>(
    path: string
  ): Observable<SnapshotAction<T>[]> {
    return this.db.list<T>(path).snapshotChanges();
  }

  pushToList<T>(path: string, itemToPush: T): void {
    this.db.list(path).push(itemToPush);
  }

  postObject<T>(path: string, objectToPost: T): void {
    this.db.object(path).set(objectToPost);
  }

  getObjectAsObservavble<T>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  }

  deleteFromList(path: string, key: string): void {
    this.db.list(path).remove(key);
  }
}
