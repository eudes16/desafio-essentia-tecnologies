import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../services/login.service';
import { DefaultLoginLayout } from '../../shared/components/layouts/default-login-layout/default-login-layout';
import { Router } from '@angular/router';

interface SignupForm {
    name: FormControl,
    email: FormControl,
    password: FormControl
}

@Component({
    selector: 'app-signup',
    imports: [DefaultLoginLayout, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule],
    providers: [LoginService, MessageService],
    templateUrl: './signup.html',
    styleUrl: './signup.scss'
})
export class Signup {
    private router = inject(Router);
    signUpForm!: FormGroup<SignupForm>;

    constructor(
        private loginService: LoginService,
        private messageService: MessageService
    ) {
        this.signUpForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    submit() {
        this.loginService.register(
            this.signUpForm.value.name!,
            this.signUpForm.value.email!,
            this.signUpForm.value.password!
        ).then((response) => {
            if (response && response.data) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Signup Successful',
                    detail: 'Welcome aboard!'
                });
                this.router.navigate(['/']);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Signup Failed',
                    detail: 'Please check your details and try again'
                });
            }
        }).catch((error) => {
            console.error('Signup error:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Signup Failed',
                detail: 'An error occurred during signup'
            });
        });
    }

    navigate() {
        this.router.navigate(['/']);
    }
}
