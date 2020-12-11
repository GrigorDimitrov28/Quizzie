import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class QuizService {
  

  constructor(private http: HttpClient) {}
  
  create(data: any): Observable<any> {
    
    return this.http
      .post(`/quiz/create`, data )
  }

  getRandom(): Observable<any> {

    return this.http
      .get(`/quiz/random`)
  }

  getCustom(data: any): Observable<any> {
    return this.http
      .get(`/quiz/custom/${data}`)
  }
}