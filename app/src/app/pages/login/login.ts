import { Component, inject } from '@angular/core';
import { DefaultLoginLayout } from '../../shared/components/layouts/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/api';

interface LoginForm {
    email: FormControl,
    password: FormControl
}

@Component({
    selector: 'app-login',
    imports: [DefaultLoginLayout, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule],
    providers: [LoginService, MessageService],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    private router = inject(Router);
    loginForm!: FormGroup<LoginForm>;

    constructor(
        private loginService: LoginService,
        private messageService: MessageService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    submit() {
        this.loginService.login(
            this.loginForm.value.email!,
            this.loginForm.value.password!
        ).then((response) => {
            if (response && response.data) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Login Successful',
                    detail: 'Welcome back!'
                });
                this.router.navigate(['/todos']);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: 'Invalid email or password'
                });
            }
        }).catch((error) => {
            console.error('Login error:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Invalid email or password'
            });
        });
    }

    navigate() {
        this.router.navigate(['signup']);
    }
}
