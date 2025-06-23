import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { TodoService } from '../../services/todo.service';
import { TodoPriority, TodoResponse, TodoStatus } from '../../types/todo-response.type';
import { CommonModule } from '@angular/common';
import { TodoCard } from '../../shared/components/todo-card/todo-card';
import { MenuItem } from 'primeng/api';
import { Modal } from "../../shared/components/modal/modal";


@Component({
    selector: 'app-todos',
    imports: [PanelModule, CommonModule, TodoCard, MenubarModule, MenuModule, ButtonModule, PaginatorModule, Modal],
    providers: [LoginService],
    templateUrl: './todos.html',
    styleUrl: './todos.scss'
})
export class Todos {
    private router = inject(Router);

    onEditTodo = signal<Partial<TodoResponse | boolean>>(false);
    openModal = signal(false);

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


    ngOnInit() {
        this.onEditTodo.set(false);
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

    onEdit(todo: TodoResponse) {
        this.onEditTodo.set(todo);
        console.log('Editing todo:', todo);
    }

    onDelete(todo: TodoResponse) {
        this.todoService.deleteTodo(todo).then(response => {
            if (response && response.data) {
                this.todos.update(oldTodos => oldTodos.filter(t => t.id !== todo.id));
                this.getTodos(); // Refresh the todo list
                console.log('Todo deleted successfully:', todo);
            } else {
                console.error('Failed to delete todo: Invalid response from server');
            }
        }).catch(error => {
            console.error('Error deleting todo:', error);
        });
    }

    newTodo() {
        // empty the onEditTodo to create a new todo
        const todo: Partial<TodoResponse> = {
            id: 0,
            title: '',
            description: '',
            dueDate: null,
            status: TodoStatus.pending,
            priority: TodoPriority.low
        };


        this.onEditTodo.update(oldValue => todo);
        this.openModal.set(true);
        console.log('Creating new todo', this.onEditTodo(), todo);
    }

    closeModal() {
        this.onEditTodo.update(oldValue => false);
        this.openModal.set(false);
        console.log('Closing modal');
    }
}
