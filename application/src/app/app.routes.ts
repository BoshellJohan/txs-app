import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Chat } from '../components/chat/chat';
import { AuthGuard } from '../guards/auth-guard';
import { Register } from '../components/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Login
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
