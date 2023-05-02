import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot,} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {SnackBarMessageService} from "../services/snack-bar-message-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
              private authService: AuthService,
              private snackBarService: SnackBarMessageService) {
  }

  /** Можно ли перейти */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  /** Можно ли загрузить */
  canLoad(route: Route): Observable<boolean> {
    return this.checkLogin(`/${route.path}`);
  }

  /** Проверка страницы на доступ */
  checkLogin(url: string): Observable<boolean> {
    // Если авторизовано или страница авторизации => разрешаем
    if (this.authService.isAuthenticated() || url == '/login')
      return new BehaviorSubject(true);

    this.snackBarService.open('You need to authorize to view that content', 'Dismiss', 10)
    this.router.navigate(['/login']);
    return new BehaviorSubject(false);
  }

  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false)
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
   */

}
