import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-modal',
    imports: [Dialog, ButtonModule],
    templateUrl: './modal.html',
    styleUrl: './modal.scss'
})
export class Modal {

    @Input() title: string = '';
    @Input() confirmationText: string = 'Confirmar';
    @Input() cancelText: string = 'Fechar';
    @Input({ required: true }) visible: boolean = false;

    @Output() onOpen = new EventEmitter();

    @Output() onClose = new EventEmitter();

    @Output() onConfirm = new EventEmitter();

    close() {
        this.visible = false;
        this.onClose.emit();
    }

    confirm() {
        this.onConfirm.emit();
        this.close();
    }

    open() {
        this.visible = true;
        this.onOpen.emit();
    }
}
