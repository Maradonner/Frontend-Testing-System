import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../models/QuestionModel";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient,
              @Inject('BASE_URL') private readonly baseApiUrl: string) {
  }


  getQuestion(id:number):Observable<Question>{
    return  this.http.get<Question>(this.baseApiUrl + '/api/Question/GetQuestion/' + id);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseApiUrl + '/api/Question/GetAllQuestions');
  }

  add(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseApiUrl + '/api/Question/CreateQuestion', question);
  }

  delete(id: number): Observable<Question> {
    return this.http.delete<Question>(this.baseApiUrl + '/api/Question/DeleteQuestion/' + id);
  }

  update(question: Question): Observable<Question> {
    return this.http.put<Question>(this.baseApiUrl + '/api/Question/UpdateQuestion', question)
  }

}
