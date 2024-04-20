import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'environments/environment';
import { Municipality } from 'app/interfaces/Municipality.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalitiesService {

  private readonly baseUrl: string = environment.baseUrl;
  token = '';

  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  create(department: Municipality): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/municipalities`, department, { headers });
  }

  getAll() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/municipalities`, { headers });
  }

  getByDepartmentId(id: number) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/municipalities/department/` + id, { headers });
  }
}
