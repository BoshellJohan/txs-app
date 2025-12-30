import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){}

  getCollections(){
    return this.http.get("https://imposter-game-backend-srgp.onrender.com/api/v1/category/objects")
  }
}
