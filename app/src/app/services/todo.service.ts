import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { environment } from '../../environments/environment';
import { DataResponse } from '../types/data-response.type';
import { TodoResponse } from '../types/todo-response.type';
import { DataRequest } from '../types/data-request.type';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    constructor(
        private httpClient: HttpClientService
    ) {
        this.httpClient.setHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        const token = sessionStorage.getItem('auth-token');
        if (token) {
            this.httpClient.addHeader('Authorization', `Bearer ${token}`);
        }

        this.httpClient.setBaseUrl(environment.apiUrl);


    }

    async getTodos(request?: DataRequest): Promise<DataResponse<TodoResponse[]>> {
        try {
            const queryParams = this.resolveRequest(request);

            const resp = await this.httpClient.get<DataResponse<TodoResponse[]>>(`${environment.apiUrl}/todo${queryParams}`);

            if (!resp || !resp.data) {
                throw new Error('Failed to fetch todos: Invalid response from server');
            }

            return resp;

        } catch (error) {
            console.error('Error fetching todos:', error);
            throw error;
        }
    }

    async createOrUpdateTodo(todo: TodoResponse): Promise<DataResponse<TodoResponse>> {
        try {
            if (!todo || !todo.title || !todo.description) {
                throw new Error('Invalid todo item');
            }

            const method = todo.id ? 'put' : 'post';
            const url = todo.id ? `${environment.apiUrl}/todo/${todo.id}` : `${environment.apiUrl}/todo`;

            const resp = await this.httpClient[method]<DataResponse<TodoResponse>>(url, todo);

            if (!resp || !resp.data) {
                throw new Error('Failed to create or update todo: Invalid response from server');
            }

            return resp;

        } catch (error) {
            console.error('Error creating or updating todo:', error);
            throw error;
        }
    }

    async deleteTodo(todo: TodoResponse): Promise<DataResponse<TodoResponse>> {
        try {
            if (!todo || !todo.id) {
                throw new Error('Invalid todo item');
            }

            const resp = await this.httpClient.delete<DataResponse<TodoResponse>>(`${environment.apiUrl}/todo/${todo.id}`);

            if (!resp || !resp.data) {
                throw new Error('Failed to delete todo: Invalid response from server');
            }

            return resp;

        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }

    private resolveRequest(request?: DataRequest): string {
        if (!request) {
            return '';
        }

        const params: string[] = [];

        if (request.filters) {
            params.push(`${encodeURIComponent(JSON.stringify(request.filters))}`);
        }

        if (request.page !== undefined) {
            params.push(`page=${request.page}`);
        }

        if (request.limit !== undefined) {
            params.push(`limit=${request.limit}`);
        }

        return params.length > 0 ? `?${params.join('&')}` : '';
    }
}
