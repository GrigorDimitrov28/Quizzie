import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ForumService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`/forum/create`, data);
  }

  getAll(): Observable<any> {
    return this.http.get(`/forum/getAll`);
  }

  getOne(data: any): Observable<any> {
    return this.http.get(`/forum/details/${data}`);
  }

  deleteOne(data: any, id: any): Observable<any> {
    return this.http.post(`/forum/delete/${id}`, data);
  }

  editOne(data: any, id: any): Observable<any> {
    return this.http.put(`/forum/edit/${id}`, data);
  }

  comment(data: any, id: any): Observable<any> {
    return this.http.post(`/forum/comment/${id}`, data);
  }
}
