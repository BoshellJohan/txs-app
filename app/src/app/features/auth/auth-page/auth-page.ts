import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { AuthService } from '@/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  imports: [Login, Register],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})

export class AuthPage implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router:Router){}
  private destroy$ = new Subject<void>();

  isLogin: boolean = true;

  ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if(user) this.router.navigate(['/dashboard']);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showLogin(){
    this.isLogin = true;
  }

  showRegister(){
    this.isLogin = false;
  }
}
