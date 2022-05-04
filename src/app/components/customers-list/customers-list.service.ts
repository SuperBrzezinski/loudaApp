import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersListService {
  constructor(private apiService: ApiService) {}

  public getCustomers(): Observable<User[]> {
    return this.apiService.getUsers().pipe(
      map((userList) => {
        return userList.filter((user) => {
          return user.role === 'customer';
        });
      })
    );
  }
}
