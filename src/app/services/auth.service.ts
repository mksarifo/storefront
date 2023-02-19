import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../config/constants";
import {Login} from "../domain/Login";

type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  getToken(): string {
    const tokenInLocalStorage: string | null = localStorage.getItem('authenticationToken');
    const tokenInSessionStorage: string | null = sessionStorage.getItem('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(`${BASE_URL}/authenticate`, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('authenticationToken');
      localStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      localStorage.setItem('authenticationToken', jwt);
      sessionStorage.removeItem('authenticationToken');
    } else {
      sessionStorage.setItem('authenticationToken', jwt);
      localStorage.removeItem('authenticationToken');
    }
  }
}
