import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    private client!: AxiosInstance;
    private baseUrl: string = environment.apiUrl;

    private headers: any = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    constructor() {
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: this.headers
        });
    }

    async get<T>(url: string, headers?: any): Promise<T> {
        try {
            const options: AxiosRequestConfig = {};
            if (headers) {
                options.headers = { ...this.headers, ...headers };
            }
            const response: AxiosResponse<T> = await this.client.get(url, options);
            return response.data;
        } catch (error: any) {
            console.error('Error during GET request:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    }

    async post<T>(url: string, data: any, headers?: any): Promise<T> {
        try {
            const options: AxiosRequestConfig = {};
            if (headers) {
                options.headers = { ...this.headers, ...headers };
            }
            const response: AxiosResponse<T> = await this.client.post(url, data, options);
            console.log('Response from POST request:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error during POST request:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    }

    async put<T>(url: string, data: any, headers?: any): Promise<T> {
        try {
            const options: AxiosRequestConfig = {};
            if (headers) {
                options.headers = { ...this.headers, ...headers };
            }
            const response: AxiosResponse<T> = await this.client.put(url, data, options);
            return response.data;
        } catch (error: any) {
            console.error('Error during PUT request:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    }

    async delete<T>(url: string, headers?: any): Promise<T> {
        try {
            const options: AxiosRequestConfig = {};
            if (headers) {
                options.headers = { ...this.headers, ...headers };
            }
            const response: AxiosResponse<T> = await this.client.delete(url, options);
            return response.data;
        } catch (error: any) {
            console.error('Error during DELETE request:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    }

    setBaseUrl(url: string): void {
        this.baseUrl = url;
        this.client.defaults.baseURL = url;
    }

    setHeaders(headers: any): void {
        this.headers = { ...this.headers, ...headers };
        this.client.defaults.headers = this.headers;
    }

    addHeader(key: string, value: string): void {
        this.headers[key] = value;
        this.client.defaults.headers[key] = value;
    }

    removeHeader(key: string): void {
        delete this.headers[key];
        delete this.client.defaults.headers[key];
    }

}
