import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-todos',
    imports: [],
    providers: [LoginService],
    templateUrl: './todos.html',
    styleUrl: './todos.scss'
})
export class Todos {
    private router = inject(Router);
    constructor(private loginService: LoginService) { }

    logout() {
        // Implement logout logic here
        this.loginService.logout().then(response => {
            if (response && response.data) {
                this.router.navigate(['/']);
            } else {
                console.error('Logout failed: Invalid response from server');
            }
        }).catch(error => {
            console.error('Error during logout:', error);
        });
        console.log('User logged out');
    }
}
