import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../interfaces/login.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient){
    const storedToken = sessionStorage.getItem('token'); //Revisar si hay sesión iniciada
    if(storedToken){
      //Consultar usuario
    }
  };

  private apiURL = 'http://localhost:8080/auth'
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, credentials);
  }

  saveUser(user: User): void {
    this.userSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getToken():string | null{
    return sessionStorage.getItem('token');
  }

  saveToken(token:string): void {
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    this.userSubject.next(null);
    sessionStorage.removeItem('user');
  }

  isAuthenticated(){
    return this.userSubject.value !== null;
  }
}
