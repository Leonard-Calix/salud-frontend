import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import User from 'app/interfaces/User.interface';
import { AuthStatus } from 'app/interfaces/AuthStattusEnum';
import { LoginResponse } from 'app/interfaces/login-response.interface';
import { CheckToekenResponse } from 'app/interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  _currentUser: User = null;
  _authStatus: AuthStatus = AuthStatus.checking;

  constructor(private readonly http: HttpClient) {

    this.checkAuthStatus().subscribe();

  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser = user;
          this._authStatus = AuthStatus.authenticate;
          localStorage.setItem('token', token)
          localStorage.setItem('AuthStatus', AuthStatus.authenticate)
          //console.log({ user, token })
        }),
        map(() => true),
        // error
        catchError(err => throwError(() => err.error.msg))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    return this.http.get<CheckToekenResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => {
          this._currentUser = user;
          this._authStatus = AuthStatus.authenticate;
          localStorage.setItem('token', token)
          localStorage.setItem('AuthStatus', AuthStatus.authenticate)
          return true;
        }),
        //error
        catchError(() => {
          this._authStatus = AuthStatus.notAuthenticate;
          return of(false);
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatus = AuthStatus.notAuthenticate;
  }

  getName(): string {
    return this._currentUser.firstName.concat(' ', String(this._currentUser.lastName));
  }

  getCheckStatus(): string {
    // Verificar si el usuario está autenticado
    return this._authStatus;
  }


}
