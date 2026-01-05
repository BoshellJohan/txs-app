import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {
  constructor(private userService: UserService, private authService: AuthService, private tokenService: TokenService, private router: Router){}

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  onSubmit(){
    // if(this.registerForm.invalid) return;
    this.userService.signup(this.registerForm.value as any)
    .subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.log(err),
    })
  };
}
