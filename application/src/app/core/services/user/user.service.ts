import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, RegisterResponse } from '@/shared/interfaces/register.models';
import { AuthService } from '@/core/services/auth/auth.service';
import { TokenService } from '@/core/services/token/token.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService, private authService: AuthService){}
  private apiURL = 'http://localhost:8080/register';

  signup(credentials: RegisterRequest): Observable<RegisterResponse>{
      return this.http.post<RegisterResponse>(`${this.apiURL}/signup`, credentials).pipe(
        tap(res => {
          this.tokenService.saveTokens(res.accessToken, res.refreshToken);
          this.authService.saveUser(res.user);
        })
      );
  }

  getProfile(){
    return this.http.get('http://localhost:8080/dashboard');
  }
}
