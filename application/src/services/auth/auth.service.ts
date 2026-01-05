import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../interfaces/login.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router){
    this.loadTokenFromSessionStorage();
  };

  private apiURL = 'http://localhost:8080/auth'
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, credentials);
  }

  getUser(token: string): Observable<User>{
    return this.http.post<User>(`${this.apiURL}/getuser`, { token });
  }

  saveUser(user: User): void {
    this.userSubject.next(user);
  }

  getToken():string | null{
    return sessionStorage.getItem('token');
  }

  saveToken(token:string): void {
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    this.userSubject.next(null);
    sessionStorage.removeItem('token');
  }

  isAuthenticated(){
    return this.userSubject.value !== null;
  }

  loadTokenFromSessionStorage(){
    const storedToken = sessionStorage.getItem('token');
    if(storedToken){
      this.getUser(storedToken).subscribe({
        next: (res) => {
          this.saveUser(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) =>  console.log(err),
      })
    }
  }
}
