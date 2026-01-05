import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../../interfaces/register.models';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService, private authService: AuthService){}
  private apiURL = 'http://localhost:8080/register';

  signup(credentials: RegisterRequest): Observable<RegisterResponse>{
      return this.http.post<RegisterResponse>(`${this.apiURL}/signup`, credentials).pipe(
        tap(res => {
          this.tokenService.setToken(res.token);
          this.authService.saveUser(res.user);
        })
      );
  }
}
