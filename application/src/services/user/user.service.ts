import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../../interfaces/register.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){}
  private apiURL = 'http://localhost:8080/register';

  addNewUser(credentials: RegisterRequest): Observable<RegisterResponse>{
      return this.http.post<RegisterResponse>(`${this.apiURL}/addNewUser`, credentials);
  }

}
