import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from 'app/interfaces/User.interface';
import { environment } from 'environments/environment';
import { map } from 'jquery';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';


  constructor(private readonly http: HttpClient) {

    this.token = localStorage.getItem('token');

  }

  create(user: any): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post<any>(`${this.baseUrl}/users`, user, { headers });
    
  }

  findAll(): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/users`, { headers });
  }

  remove(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.delete(`${this.baseUrl}/users/` + id, { headers });
  }

}
