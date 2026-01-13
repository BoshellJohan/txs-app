import { Component } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../register/register';

@Component({
  selector: 'app-auth-page.ts',
  imports: [Login, Register],
  templateUrl: './auth-page.ts.html',
  styleUrl: './auth-page.ts.scss',
})
export class AuthPage {
  displayComponent: boolean = true;
}
