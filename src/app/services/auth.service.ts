import {EventEmitter, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../config/constants";
import {Login} from "../domain/Login";

type JwtToken = {
  accessToken: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated = new EventEmitter<boolean>();
  getToken(): string {
    const tokenInLocalStorage: string | null = localStorage.getItem('authenticationToken');
    const tokenInSessionStorage: string | null = sessionStorage.getItem('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(`${BASE_URL}/login`, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      localStorage.removeItem('authenticationToken');
      this.isAuthenticated.emit(false);
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.accessToken;
    this.isAuthenticated.emit(true);
    if (rememberMe) {
      localStorage.setItem('authenticationToken', jwt);
      sessionStorage.removeItem('authenticationToken');
    } else {
      sessionStorage.setItem('authenticationToken', jwt);
      localStorage.removeItem('authenticationToken');
    }
  }

  register(user: { password: string; email: string }) {
    return this.http
      .post<JwtToken>(`${BASE_URL}/register`, user)
      .pipe(map(response => this.authenticateSuccess(response, true)));
  }
}
