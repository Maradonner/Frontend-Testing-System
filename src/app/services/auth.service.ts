import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {User} from "../models/User";
import {Response} from "../models/Response";

export class RefreshToken {
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private refreshToken: string;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') private readonly baseApiUrl: string) {
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/Auth/register', user)
  }


  login(user: User): Observable<Response> {
    return this.http.post<Response>(this.baseApiUrl + '/api/Auth/login', user).pipe(
      tap(
        ({token, refreshToken}) => {
          localStorage.setItem('auth-token', token);
          localStorage.setItem('refreshToken', refreshToken);
          this.setToken(token);
          this.setRefreshToken(refreshToken);
        }
      )
    )
  }

  newRefreshToken(): Observable<Response> {
    let refreshToken: string = this.getRefreshToken();
    let object: RefreshToken = {
      refreshToken: refreshToken
    }


    console.log(refreshToken)

    return this.http.post<Response>(this.baseApiUrl + '/api/Auth/refresh-token', object).pipe
    (tap(
        ({token, refreshToken}) => {
          ``
          console.log('STORAGE BASED')
          localStorage.setItem('auth-token', token)
          localStorage.setItem('refreshToken', refreshToken)
          this.setToken(token)
          this.setRefreshToken(refreshToken)
        }
      )
    )
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }


  setToken(token: string) {
    this.token = token;
  }


  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRefreshToken(): boolean {
    return !!this.refreshToken
  }

  logout() {
    this.setToken(null);
    this.setRefreshToken(null);
    localStorage.clear();
  }

}
