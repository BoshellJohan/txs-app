import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Chat } from '../components/chat/chat';
import { AuthGuard } from '../guards/auth-guard';

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
        path: 'dashboard',
        component: Chat,
        canActivate: [AuthGuard]
    },
];
