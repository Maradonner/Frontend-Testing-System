import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CacheService} from "../Cache/cache.service";
import {cachedRequest} from "../Cache/CacheDecorator";
import {Quiz} from "../models/QuizModel";
import {Data} from "../models/Data";
import {ContinueTriviaResponse} from "../models/ContinueTriviaResponse";


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient,
              private readonly cache: CacheService,
              @Inject('BASE_URL') private readonly baseApiUrl: string) {
  }


  @cachedRequest(function () {
    return this.cache;
  })
  displayAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseApiUrl + '/api/Quiz/display-all');
  }

  getTotalPages(): Observable<number> {
    return this.http.get<number>(this.baseApiUrl + '/api/Quiz/TotalPages')
  }

  getPageNumber(pageNumber): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseApiUrl + '/api/Quiz/Page/' + pageNumber);
  }

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseApiUrl + '/api/Quiz');
  }

  getById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.baseApiUrl + '/api/Quiz/' + id);
  }

  update(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(this.baseApiUrl + '/api/Quiz', quiz);
  }

  add(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.baseApiUrl + '/api/Quiz/create-quiz', quiz);
  }

  gameStart(id: number): Observable<Data> {
    return this.http.get<Data>(this.baseApiUrl + '/api/Game/StartTrivia/' + id);
  }

  continueTrivia(answer: any): Observable<ContinueTriviaResponse> {
    return this.http.post<ContinueTriviaResponse>(this.baseApiUrl + '/api/Game/ContinueTrivia', answer);
  }

  getMyQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseApiUrl + '/api/Quiz/get-my-quizzes')
  }

  deleteQuiz(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseApiUrl + '/api/Quiz/delete/' + id);
  }


}
