import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';

  constructor(private readonly http: HttpClient) {

    this.token = localStorage.getItem('token');

  }

  getGraphicsFamiliasAtendidas(req: any) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/graficos/numero-familas-atendidas`, req, { headers });
  }

  getGraphicsDesnutricion(req: any) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/graficos/porcentaje-desnutricion`, req, { headers });
  }

  getGraphicsNinos(req: any) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/graficos/porcentaje-ninos`, req, { headers });
  }

  getGraphicsGeneral(req: any) {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post(`${this.baseUrl}/graficos/porcentaje-general-anio`, req, { headers });
  }
}
