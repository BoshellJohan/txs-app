import { Routes } from '@angular/router';
import { AuthGuard } from '@/core/guards/auth-guard';
import { Login } from '@/features/auth/login/login';
import { Chat } from '@/features/dashboard/chat/chat';
import { Register } from '@/features/auth/register/register';
import { AuthPage } from './features/auth/auth-page/auth-page';

export const routes: Routes = [
    {
        path: '',
        component: AuthPage
    },
    {
        path: 'auth',
        component: AuthPage
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: Chat
        // loadComponent: ():any => {
        //     import('../components/chat/chat')
        //     .then(m => m.Chat);
        // }
    },
];
