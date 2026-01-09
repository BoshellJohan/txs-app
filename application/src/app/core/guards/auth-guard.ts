import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
import { map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if(this.tokenService.hasToken()){
      return of(true);
    }

    return this.tokenService.accessToken$.pipe(
      take(1),
      map(token => {
        if(token){
          return true;
        }

        //No hay token -> Redirigir a Login
        this.router.navigate(['/login']);
        return false;
      })
    )
  }
}
