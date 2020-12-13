import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class QuizService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`/quiz/create`, data);
  }

  getRandom(): Observable<any> {
    return this.http.get(`/quiz/random`);
  }

  getCustom(data: any): Observable<any> {
    return this.http.get(`/quiz/custom/${data}`);
  }

  submitRandomQuiz(data: any): Observable<any> {
    return this.http.post(`/quiz/testRandom`, data);
  }

  submitCustomQuiz(data: any): Observable<any> {
    return this.http.post(`/quiz/testCustom`, data);
  }

  getDetails(id: any): Observable<any> {
    return this.http.get(`/quiz/details/${id}`);
  }

  getAll():Observable<any> {
    return this.http.get(`/quiz/getAll`);
  }
}
