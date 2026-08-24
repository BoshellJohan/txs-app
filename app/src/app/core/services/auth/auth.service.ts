import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '@/shared/interfaces/login.models';
import { TokenService } from '@/core/services/token/token.service';
import { User } from '@/shared/interfaces/user.models';
import { BehaviorSubject, Observable, tap, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router){};

  private apiURL = 'http://localhost:8080/auth'
  private userSubject = new BehaviorSubject<User | null>(null);

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

  get user$(){
    return this.userSubject.asObservable();
  }

  isAuthenticated(){
    return this.userSubject.value !== null;
  }

  refreshToken(refreshToken: string): Observable<{accessToken: string}>{
    return this.http.post<{accessToken: string}>(`${this.apiURL}/refresh`, {refreshToken});
  }

  logout(refreshToken: string){
    return this.http.post(`${this.apiURL}/logout`, {refreshToken}).pipe(
      tap(() => {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
      })
    );
  }

  rehydrateSession(): Observable<void> {
    const token = this.tokenService.getAccessToken();
    if(!token) return of(void 0);

    return this.http.get<User>(`${this.apiURL}/me`).pipe(
      tap(user => {
        if(user) this.saveUser(user);
        console.log(this.userSubject.value);
      }),
      catchError(() => {
        this.tokenService.clearTokens();
        return of(void 0);
      }),
      map(() => void 0)
    );
  }
}
