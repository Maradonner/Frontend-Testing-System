import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              @Inject('BASE_URL') private readonly baseApiUrl: string) {
  }


  getInfo():Observable<any>{
    return this.http.get<any>(this.baseApiUrl +  '/api/User/GetInfo' )
  }

  getAllAttempts():Observable<unknown>{
    return  this.http.get<unknown>(this.baseApiUrl +  '/api/User/GetAllAttempts' );
  }

}
