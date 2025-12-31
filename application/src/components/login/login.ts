import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private authService: AuthService, private router: Router){}
  user:User = {username: ''};

   userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
   })

   onSubmit(){
    if(this.userForm.invalid) return;
    this.login();
    }

    login(){
      this.authService.login(this.userForm.value as any)
      .subscribe({
        next: (res) => {
          this.authService.saveUser(res.user);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log("Login error", err);
        }
      })
    }
}
