import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../interfaces/login.models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../interfaces/user.models';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router){};

  private apiURL = 'http://localhost:8080/auth'
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, credentials).pipe(
      tap(res => {
        this.tokenService.saveTokens(res.accessToken, res.refreshToken);
        this.saveUser(res.user as any);
      })
    );
  }

  getUser(token: string): Observable<User>{
    return this.http.post<User>(`${this.apiURL}/getuser`, { token });
  }

  saveUser(user: User): void {
    this.userSubject.next(user);
  }

  logout(): void {
    this.userSubject.next(null);
  }

  isAuthenticated(){
    return this.userSubject.value !== null;
  }
}
