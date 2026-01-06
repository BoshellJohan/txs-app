import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          return throwError(() => error);
        }

        const refreshToken = this.tokenService.getRefreshToken();
        if(!refreshToken || this.isRefreshing){
          this.tokenService.clearTokens();
          return throwError(() => error);
        }

        this.isRefreshing = true;

        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((res) => {
            this.isRefreshing = false;
            this.tokenService.saveTokens(res.accessToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`,
              }
            })

            return next.handle(retryReq)
          }),

          catchError(err => {
            this.isRefreshing = false;
            this.tokenService.clearTokens();
            return throwError(() => err);
          })
        )
      })
    );
  }
}