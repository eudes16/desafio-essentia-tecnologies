import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoPriority, TodoResponse, TodoStatus } from '../../../types/todo-response.type';

import { ReactiveFormsModule } from '@angular/forms';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';


interface TodoEditForm {
    title: FormControl;
    description: FormControl;
    priority: FormControl;
    status: FormControl;
    dueDate: FormControl;
}

@Component({
    selector: 'app-todo-edit',
    imports: [IconFieldModule, InputIconModule, InputTextModule, ReactiveFormsModule, TextareaModule, SelectButtonModule, DatePickerModule, ButtonModule],
    templateUrl: './todo-edit.html',
    styleUrl: './todo-edit.scss'
})
export class TodoEdit {
    todoForm!: FormGroup<TodoEditForm>;

    @Input() todo!: TodoResponse;

    @Output() onClose = new EventEmitter();
    @Output() onSubmit = new EventEmitter<TodoResponse>();

    priorities = [
        { label: 'Baixa', value: TodoPriority.low },
        { label: 'Média', value: TodoPriority.medium },
        { label: 'Alta', value: TodoPriority.high }
    ];

    statuses = [
        { label: 'Pendente', value: TodoStatus.pending },
        { label: 'Em Progresso', value: TodoStatus.inProgress },
        { label: 'Concluído', value: TodoStatus.completed },
        { label: 'Cancelado', value: TodoStatus.cancelled }
    ];

    ngOnInit() {

        this.todoForm = new FormGroup<TodoEditForm>({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            priority: new FormControl<TodoPriority>(TodoPriority.low, [Validators.required]),
            status: new FormControl<TodoStatus>(TodoStatus.pending, [Validators.required]),
            dueDate: new FormControl<string | null>(null)
        });

        if (this.todo) {
            this.todoForm.patchValue({
                title: this.todo.title,
                description: this.todo.description,
                priority: this.todo.priority,
                status: this.todo.status,
                dueDate: this.todo.dueDate ? new Date(this.todo.dueDate) : null
            });
        } else {
            this.reset();
        }

    }

    ngOnChanges() {
        console.log('Todo data changed:', this.todo);
        if (this.todo) {

        }
    }

    submit() {
        if (this.todoForm.valid) {
            const todoData = this.todoForm.value;
            console.log('Submitting todo:', todoData);
            this.onSubmit.emit({
                ...this.todo,
                ...todoData,
                dueDate: todoData.dueDate ? todoData.dueDate.toISOString() : null
            } as TodoResponse);
            // Here you would typically send the data to your service
            // this.todoService.createOrUpdateTodo(todoData).then(response => { ... });
        } else {
            console.error('Form is invalid', this.todoForm.errors);
        }
    }

    reset() {
        this.todoForm.reset({
            title: '',
            description: '',
            priority: TodoPriority.low,
            status: TodoStatus.pending,
            dueDate: null
        });
    }

    close() {
        this.reset();
        this.onClose.emit();
    }
}
