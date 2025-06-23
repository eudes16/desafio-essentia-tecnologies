import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TodoPriority, TodoResponse, TodoStatus } from '../../../types/todo-response.type';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { HelpersService } from '../../../services/helpers.service';

@Component({
    selector: 'app-todo-card',
    imports: [PanelModule, TagModule, DividerModule, ButtonModule],
    templateUrl: './todo-card.html',
    styleUrl: './todo-card.scss'
})
export class TodoCard {
    helper = inject(HelpersService)

    @Input({ required: true }) todo!: TodoResponse;

    @Output() onEdit = new EventEmitter<TodoResponse>();

    @Output() onDelete = new EventEmitter<TodoResponse>();

    @Output() onComplete = new EventEmitter<TodoResponse>();

    titleClass = {
        'font-bold': true,
        'line-through': false,
        'text-gray-500': false
    };

    ngOnInit() {
        if (this.todo.status === TodoStatus.completed || this.todo.status === TodoStatus.cancelled) {
            this.titleClass['line-through'] = true;
            this.titleClass['text-gray-500'] = true;
        }
    }

    edit(todo: TodoResponse) {
        this.onEdit.emit(this.todo);
    }

    delete(todo: TodoResponse) {
        this.onDelete.emit(this.todo);
    }

    resolvePrority(priority: TodoPriority): string {
        switch (priority) {
            case TodoPriority.low:
                return 'Baixa';
            case TodoPriority.medium:
                return 'Média';
            case TodoPriority.high:
                return 'Alta';
            default:
                return 'Indefinida';
        }
    }

    resolvePriorityIcon(priority: TodoPriority): string {
        switch (priority) {
            case TodoPriority.low:
                return 'pi pi-chevron-down';
            case TodoPriority.medium:
                return 'pi pi-minus';
            case TodoPriority.high:
                return 'pi pi-chevron-up';
            default:
                return 'pi pi-question-circle';
        }
    }

    resolveProritySeverity(priority: TodoPriority): string {
        switch (priority) {
            case TodoPriority.low:
                return 'success';
            case TodoPriority.medium:
                return 'warn';
            case TodoPriority.high:
                return 'danger';
            default:
                return 'info';
        }
    }

    resolveStatusSeverity(status: TodoStatus): string {
        switch (status) {
            case TodoStatus.pending:
                return 'info';
            case TodoStatus.inProgress:
                return 'warn';
            case TodoStatus.completed:
                return 'success';
            case TodoStatus.cancelled:
                return 'danger';
            default:
                return 'secondary';
        }
    }

    resolveStatusIcon(status: TodoStatus): string {
        switch (status) {
            case TodoStatus.pending:
                return 'pi pi-clock';
            case TodoStatus.inProgress:
                return 'pi pi-spinner';
            case TodoStatus.completed:
                return 'pi pi-check';
            case TodoStatus.cancelled:
                return 'pi pi-times';
            default:
                return 'pi pi-question-circle';
        }
    }

    resolveStatus(status: TodoStatus): string {
        switch (status) {
            case TodoStatus.pending:
                return 'Pendente';
            case TodoStatus.inProgress:
                return 'Em progresso';
            case TodoStatus.completed:
                return 'Concluído';
            case TodoStatus.cancelled:
                return 'Cancelado';
            default:
                return 'Indefinido';
        }
    }

    isCompleted(): boolean {
        return this.todo.status === TodoStatus.completed;
    }
}
