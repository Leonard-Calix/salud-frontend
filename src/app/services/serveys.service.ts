import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServeysService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';

  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  findAll(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get(`${this.baseUrl}/surveys`, { headers });
  }


  findOne(serverId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get(`${this.baseUrl}/surveys/` + serverId, { headers });
  }

}
