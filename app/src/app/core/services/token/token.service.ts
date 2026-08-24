import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TokenService {
    private ACCESS_TOKEN_KEY = 'access_token';
    private REFRESH_TOKEN_KEY = 'refresh_token';
    private accessTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(){}

    getAccessToken(): string | null {
        return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null{
        return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    saveTokens(accessToken: string, refreshToken?:string): void{
        sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        if(refreshToken) sessionStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    clearTokens(){
        sessionStorage.clear();
    }

    hasToken(){
        return !!this.getAccessToken();
    }

    //Funciones para el BehaviorSubject
    get accessToken$(): Observable<string | null>{
        return this.accessTokenSubject.asObservable();
    }

    emitNewAccessToken(token:string){
        this.accessTokenSubject.next(token);
    }

    clearAccessStream(){
        this.accessTokenSubject.next(null);
    }
}