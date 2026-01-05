import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {
    constructor() {
        this.loadTokenFromSessionStorage();
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    setToken(token: string){
        sessionStorage.setItem('token', token);
    }

    clearToken(){
        sessionStorage.removeItem('token');
    }

    loadTokenFromSessionStorage(){
    const storedToken = sessionStorage.getItem('token');

    if(!storedToken) return;

    this.setToken(storedToken);
  }
}