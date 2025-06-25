import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { TodoService } from '../../services/todo.service';
import { TodoPriority, TodoResponse, TodoStatus } from '../../types/todo-response.type';
import { CommonModule } from '@angular/common';
import { TodoCard } from '../../shared/components/todo-card/todo-card';
import { MenuItem } from 'primeng/api';
import { TodoEdit } from "../../shared/components/todo-edit/todo-edit";
import { DialogService } from '../../services/dialog-service';

@Component({
    selector: 'app-todos',
    imports: [PanelModule, CommonModule, TodoCard, MenubarModule, MenuModule, ButtonModule, PaginatorModule, Dialog, TodoEdit],
    providers: [LoginService],
    templateUrl: './todos.html',
    styleUrl: './todos.scss'
})
export class Todos {
    private router = inject(Router);
    protected dialogService = inject(DialogService);

    onEditTodo!: TodoResponse;
    openModal = false;

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

        this.dialogService.open({title: 'Confirmar logout', message: 'Você tem certeza que deseja fazer o logout?', options: {
            onConfirmCallback: async () => {
                const resp = await this.loginService.logout();
                if (resp && resp.data) {
                    this.router.navigate(['/']);
                }
            }
        }});
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
        this.onEditTodo = {} as TodoResponse; // Initialize onEditTodo
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
        this.onEditTodo = todo;
        this.openModal = true;
    }

    onDelete(todo: TodoResponse) {
        this.dialogService.open({
            title: 'Confirmar exclusão',
            message: `Você tem certeza que deseja excluir a tarefa "${todo.title}"?`,
            options: {
                onConfirmCallback: async () => {
                    const resp = await this.todoService.deleteTodo(todo);
                    if (resp && resp.data) {
                        this.getTodos(); // Refresh the todo list
                    }
                },
                confirmLabel: 'Excluir',
                cancelLabel: 'Cancelar'
            }
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

        this.onEditTodo = todo as TodoResponse;
        this.openModal = true;
        console.log('Creating new todo', this.onEditTodo, todo);
    }

    closeModal() {
        this.onEditTodo = {} as TodoResponse; // Reset the todo being edited
        this.openModal = false;
        console.log('Closing modal', this.openModal);
    }

    onSave(todo: TodoResponse) {
        console.log('Saving todo:', todo);
        this.todoService.createOrUpdateTodo(todo).then(response => {
            if (response && response.data) {
                // Update the todo list with the new or updated todo
                if (todo.id) {
                    this.todos.update(oldTodos => oldTodos.map(t => t.id === todo.id ? response.data : t));
                } else {
                    this.todos.update(oldTodos => [...oldTodos, response.data]);
                }
                this.getTodos();
            } else {
                console.error('Failed to save todo: Invalid response from server');
            }
        }).catch(error => {
            console.error('Error saving todo:', error);
        });
        this.closeModal();
    }

}
