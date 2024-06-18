import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Req } from 'app/interfaces/Req.Interface';
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

  create(req: Req) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.post(`${this.baseUrl}/monitoreo-completo`, req, { headers });
  }

}
