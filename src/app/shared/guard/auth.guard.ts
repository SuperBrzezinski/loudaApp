import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectUserisLoggedIn } from 'src/app/state/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public store: Store<AppState>
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectUserisLoggedIn).pipe(
      map((isLoggedIn) => {
        // console.log(role);

        if (!isLoggedIn) {
          this.router.navigate(['sign-in']);
        }
        return true;
      })
    );
    // if (this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['sign-in']);
    // }
    // return true;
  }
}
