import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {catchError, EMPTY, from, lastValueFrom, mergeMap, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {
  }

  private async handle(request: HttpRequest<any>, next: HttpHandler) {
    const token = "Bearer " + this.auth.getToken();
    const refreshToken = this.auth.getRefreshToken();


    console.log(request.url)

    if (request.url.startsWith("https://api.cloudinary.com")) {
      return await next.handle(request).toPromise()
    }

    let authReq = request.clone({
      setHeaders: {
        Authorization: token ? token : ''
      }
    });


    return await lastValueFrom(next.handle(authReq).pipe(
      catchError(async (err: HttpErrorResponse) => {
        if (err.status === 401 && !!refreshToken) {
          const roleTypes$ = this.auth.newRefreshToken();
          await lastValueFrom(roleTypes$).catch((error: HttpErrorResponse) => {
            if (error.error == 'Invalid Refresh Token') {
              this.auth.logout();
              this.router.navigate(['/login'])
            }
            return undefined;
          });
          return next.handle(request.clone({
            setHeaders: {
              Authorization: "Bearer " + this.auth.getToken()
            }
          })).toPromise();
        }
        return throwError(() => err).toPromise()
      })
    ))


  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }


}



