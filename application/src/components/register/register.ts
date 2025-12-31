import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {
  constructor(private userService: UserService){}

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  onSubmit(){
    // if(this.registerForm.invalid) return;
    console.log("Añadiendo usuario")
    this.userService.addNewUser(this.registerForm.value as any)
    .subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
  };
}
