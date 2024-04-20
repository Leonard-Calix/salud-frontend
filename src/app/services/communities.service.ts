import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Community } from 'app/interfaces/Community.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private readonly baseUrl: string = environment.baseUrl;
  token = '';


  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  create(department: Community): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/communities`, department, { headers });


  }

  getAll() {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/communities`, { headers });
  }

  getByCommunityByMunicipalityId(id: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/communities/municipality/` + id, { headers });
  }


}
