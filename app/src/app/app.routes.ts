import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Todos } from './pages/todos/todos';
import { AuthGuard } from './services/auth-guard.service';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'todos',
        component: Todos,
        canActivate: [AuthGuard]

    }

];
