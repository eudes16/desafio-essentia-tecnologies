import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Todos } from './pages/todos/todos';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },

    {
        path: 'todos',
        component: Todos,
        canActivate: [AuthGuard]

    }

];
