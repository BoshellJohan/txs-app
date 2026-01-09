import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
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
        if(error.status !== 401){
          return throwError(() => error);
        }

        const refreshToken = this.tokenService.getRefreshToken();
        if(!refreshToken){
          this.tokenService.clearTokens();
          return throwError(() => error);
        }

        //Caso para requests concurridas: Primer 401 -> Inicia Refresh
        if(!this.isRefreshing){
          this.isRefreshing = true;
          this.tokenService.clearAccessStream();

          return this.authService.refreshToken(refreshToken).pipe(
            switchMap(res => {
              this.isRefreshing = false;
              this.tokenService.saveTokens(res.accessToken);
              this.tokenService.emitNewAccessToken(res.accessToken);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });

              return next.handle(retryReq);
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.tokenService.clearTokens();
              this.tokenService.clearAccessStream();
              return throwError(() => err);
            })
          )
        }

        //Se está ejecutando un refresh en éste momento -> esperar
        return this.tokenService.accessToken$.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
              const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token!}`
              }
            });

            return next.handle(retryReq);
          })
        )
      })
    );
  }
}