import { Injectable } from '@angular/core';
import { LoginResponse, LogOutResponse } from '../types/login-response.type';
import { DataResponse } from '../types/data-response.type';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private httpClient: HttpClientService
    ) {
        this.httpClient.setBaseUrl(environment.apiUrl);
        this.httpClient.setHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }



    async login(email: string, password: string): Promise<DataResponse<LoginResponse>> {
        try {


            const resp = await this.httpClient.post<DataResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, { email, password });

            if (!resp || !resp.data) {
                throw new Error('Login failed: Invalid response from server');
            }

            sessionStorage.setItem('auth-token', resp.data.token);
            this.httpClient.addHeader('Authorization', `Bearer ${resp.data.token}`);

            return resp;

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

    }

    async register(name: string, email: string, password: string): Promise<DataResponse<LoginResponse>> {
        try {
            const resp = await this.httpClient.post<DataResponse<LoginResponse>>(`${environment.apiUrl}/auth/register`, { email, password });

            if (!resp || !resp.data) {
                throw new Error('Registration failed: Invalid response from server');
            }

            sessionStorage.setItem('auth-token', resp.data.token);
            this.httpClient.addHeader('Authorization', `Bearer ${resp.data.token}`);

            return resp;

        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    async logout(): Promise<DataResponse<LogOutResponse>> {
        try {


            const resp = await this.httpClient.post<DataResponse<LogOutResponse>>(`${environment.apiUrl}/auth/logout`, {});

            if (!resp || !resp.data) {
                throw new Error('Logout failed: Invalid response from server');
            }

            sessionStorage.removeItem('auth-token');
            this.httpClient.removeHeader('Authorization');
            return resp;

        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }


}
