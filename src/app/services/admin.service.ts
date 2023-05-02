import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient,
              @Inject('BASE_URL') private readonly baseApiUrl: string) {
  }


  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.baseApiUrl + '/api/Admin')
  }

  getUsersSort(sort: string, order: SortDirection, page: number): Observable<UserInfo[]> {
    const url = `${this.baseApiUrl}/api/Admin?sort=${sort}&order=${order}&page=${page}`;
    return this.http.get<UserInfo[]>(this.baseApiUrl + '/api/Admin')
  }


  getTotalUsers(): Observable<number>{
    return this.http.get<number>(this.baseApiUrl + '/api/Admin')
  }

  getTotalQuizzes(): Observable<number>{
    return this.http.get<number>(this.baseApiUrl + '/api/Admin')
  }

  getTotalQuestions(): Observable<number>{
    return this.http.get<number>(this.baseApiUrl + '/api/Admin')
  }

  getTotalAnswers(): Observable<number>{
    return this.http.get<number>(this.baseApiUrl + '/api/Admin')
  }



}
