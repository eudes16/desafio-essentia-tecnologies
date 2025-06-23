import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { TodoService } from '../../services/todo.service';
import { TodoResponse } from '../../types/todo-response.type';
import { CommonModule } from '@angular/common';
import { TodoCard } from '../../shared/components/todo-card/todo-card';
import { MenuItem } from 'primeng/api';

type PaginationData = {
    page: number;
    rows: number;
    total: number;
    first: number;
}
@Component({
    selector: 'app-todos',
    imports: [PanelModule, CommonModule, TodoCard, MenubarModule, MenuModule, ButtonModule, PaginatorModule],
    providers: [LoginService],
    templateUrl: './todos.html',
    styleUrl: './todos.scss'
})
export class Todos {
    private router = inject(Router);

    // Pagination properties
    rows = 5;
    first = 0;
    page = signal(0);
    total = 0;

    loading = signal(false);

    todos = signal<TodoResponse[]>([]);

    onPageChange(event: any) {
        this.getTodos(event.page, event.rows);
    }

    itemsEnd: MenuItem[] = [];

    constructor(private loginService: LoginService, private todoService: TodoService) { }

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

    getTodos(nextPage?: number, nextRows?: number) {
        this.loading.set(true);
        this.todos.set([]);

        const dataRequest = {
            page: (nextPage ?? this.page()) + 1,
            limit: nextRows ?? this.rows ?? 5,
        }

        this.todoService.getTodos(dataRequest).then(response => {
            if (response && response.data) {
                this.todos.set(response.data);
                this.total = response.page?.totalRecords || 0;
                this.page.set((response.page?.currentPage || 1) - 1);
            } else {
                console.error('Failed to fetch todos: Invalid response from server');
            }
        }).catch(error => {
            console.error('Error fetching todos:', error);
        }).finally(() => {
            this.loading.set(false)
        });
    }

    openCreateTodoDialog() {
        // Implement logic to open a dialog for creating a new todo
        console.log('Open create todo dialog');
    }

    ngOnInit() {
        this.initEndItens();
        this.getTodos();
    }


    initEndItens() {
        this.itemsEnd = [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.logout();
                }
            }
        ];
    }

}
