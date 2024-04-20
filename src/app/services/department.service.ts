import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Department } from 'app/interfaces/Department.interface';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';

  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  create(department: Department): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/departments`, department, { headers });
  }

  getAll() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/departments`, { headers });
  }

}
