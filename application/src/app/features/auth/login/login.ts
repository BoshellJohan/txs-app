import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@/core/services/token/token.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router){}

   loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
   })

   onSubmit(){
    if(this.loginForm.invalid) return;
      this.login();
    }

    login(){
      this.authService.login(this.loginForm.value as any)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log("Login error", err);
        }
      })
    }
}
