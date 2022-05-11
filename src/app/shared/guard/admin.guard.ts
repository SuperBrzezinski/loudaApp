import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectUserRole } from 'src/app/state/user/user.selectors';
import { Role } from '../models/role.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public store: Store<AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return this.store.select(selectUserRole).pipe(
    //   map((role) => {
    //     if (role !== 'admin') {
    //       this.router.navigate(['customer']);
    //     }
    //     return true;
    //   })
    // );
    if (this.authService.isAdmin !== true) {
      this.router.navigate(['sign-in']);
    }
    return true;
  }
}
