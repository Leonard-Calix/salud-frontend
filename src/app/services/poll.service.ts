import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePoll } from 'app/interfaces/Poll.Interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';

  constructor(private readonly http: HttpClient) { 

   this.token = localStorage.getItem('token');

  }

  create(poll: CreatePoll): Observable<any> {
    return this.http.post(`${this.baseUrl}/polls`, poll);
  }

  bulkCreate(body: any): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/polls/bluk-create`, body, {headers});
  }

  getAll() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/polls`, {headers});
  }
}
