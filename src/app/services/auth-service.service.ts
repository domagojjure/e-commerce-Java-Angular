import { Injectable } from '@angular/core';
import { LoginRequest } from '../common/login-request';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../common/register-request';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth'; // your backend path
  private userNameSubject = new BehaviorSubject<string | null>(this.getUsername());
  public userName$ = this.userNameSubject.asObservable();

  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authStatusSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getRole());
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response : any) => { // mogao bi napraviti neki interface koji ima sve te propertije
        this.saveToken(response.token);
        this.authStatusSubject.next(true);
        
        // korisnicko ime
        if (response.username) {
          localStorage.setItem('username', response.username)
          this.userNameSubject.next(response.username);
        }
        // uloga
        if (response.role) {
          localStorage.setItem('role', response.role);
          this.roleSubject.next(response.role);
        }

      })
    );
  }

  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  
  getRole(): string | null {
    return localStorage.getItem('role'); // ovo se moglo obaviti i sa redisom
  }
  
}
