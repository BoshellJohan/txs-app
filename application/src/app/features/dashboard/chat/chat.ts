import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/core/services/auth/auth.service';
import { UserService } from '@/core/services/user/user.service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  constructor(authService: AuthService, private userService: UserService ,private http: HttpClient){};

  onSubmit(){
    this.userService.getProfile().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
}
