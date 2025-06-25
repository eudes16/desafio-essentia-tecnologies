import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DialogSeverity = 'info' | 'success' | 'warn' | 'error';

export type DialogOpen = {
    title: string;
    message: string;
    severity?: DialogSeverity;
    options?: {
        onCloseCallback?: () => void;
        onConfirmCallback?: () => void;
        onCancelCallback?: () => void;
        confirmLabel?: string;
        cancelLabel?: string;
    }
}

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private visibleSubject = new BehaviorSubject<boolean>(false);
    private severitySubject = new BehaviorSubject<DialogSeverity>('info');
    private titleSubject = new BehaviorSubject<string>('');
    private messageSubject = new BehaviorSubject<string>('');

    private onCloseSubject = new BehaviorSubject<() => void>(() => {});
    private onConfirmSubject = new BehaviorSubject<() => void>(() => {});
    private confirmLabelSubject = new BehaviorSubject<string>('Confirm');
    private cancelLabelSubject = new BehaviorSubject<string>('Cancel');

    public onClose = (): void => {};
    public onConfirm = (): void => {};
    public onCancel = (): void => {};

    
    visible$ = this.visibleSubject.asObservable();
    severity$ = this.severitySubject.asObservable();
    title$ = this.titleSubject.asObservable();
    message$ = this.messageSubject.asObservable();
    
    onClose$ = this.onCloseSubject.asObservable();
    onConfirm$ = this.onCloseSubject.asObservable();
    confirmLabel$ = this.confirmLabelSubject.asObservable();
    cancelLabel$ = this.cancelLabelSubject.asObservable();

    open(dialog: DialogOpen) {
        this.severitySubject.next(dialog.severity ?? 'info');
        this.titleSubject.next(dialog.title);
        this.messageSubject.next(dialog.message);
        this.visibleSubject.next(true);

        if (dialog.options?.onCloseCallback) {
            this.onCloseSubject.next(dialog.options.onCloseCallback);
        }

        if (dialog.options?.onConfirmCallback) {
            this.onConfirmSubject.next(dialog.options.onConfirmCallback);
        }

        this.confirmLabelSubject.next(dialog.options?.confirmLabel ?? 'Confirm');
        this.cancelLabelSubject.next(dialog.options?.cancelLabel ?? 'Cancel');
    }

    reset() {
        this.visibleSubject.next(false);
        this.severitySubject.next('info');
        this.titleSubject.next('');
        this.messageSubject.next('');
        this.onCloseSubject.next(() => {});
        this.onConfirmSubject.next(() => {});
    }

    close() {
        if (this.onCloseSubject?.getValue()) {
            this.onCloseSubject.getValue()();
        }
        this.visibleSubject.next(false);
        this.reset();
    }

    confirm() {
        if (this.onConfirmSubject?.getValue()) {
            this.onConfirmSubject.getValue()();
        }
        this.close();
    }

    isVisible(): boolean {
        return this.visibleSubject.getValue();
    }

    getSeverity(): DialogSeverity {
        return this.severitySubject.getValue();
    }

    getTitle(): string {
        return this.titleSubject.getValue();
    }

    getMessage(): string {
        return this.messageSubject.getValue();
    }

    getCancelLabel(): string {
        return this.cancelLabelSubject.getValue();
    }

    getConfirmLabel(): string {
        return this.confirmLabelSubject.getValue();
    }

    setVisible(visible: boolean) {
        this.visibleSubject.next(visible);
    }

    setSeverity(severity: DialogSeverity) {
        this.severitySubject.next(severity);
    }

    setTitle(title: string) {
        this.titleSubject.next(title);
    }

    setMessage(message: string) {
        this.messageSubject.next(message);
    }

    setOnCloseCallback(callback: () => void) {
        this.onCloseSubject.next(callback);
    }

    setOnConfirmCallback(callback: () => void) {
        this.onConfirmSubject.next(callback);
    }

    constructor() {
        // Initialize with default values if needed
        this.visibleSubject.next(false);
        this.severitySubject.next('info');
        this.titleSubject.next('');
        this.messageSubject.next('');
        this.onCloseSubject.next(() => {});
        this.onConfirmSubject.next(() => {});
    }

    getVisibleObservable() {
        return this.visible$;
    }

    getSeverityObservable() {
        return this.severity$;
    }

    getTitleObservable() {
        return this.title$;
    }

    getMessageObservable() {
        return this.message$;
    }

    getOnCloseObservable() {
        return this.onClose$;
    }

    getOnConfirmObservable() {
        return this.onConfirm$;
    }
    
    getConfirmLabelObservable() {
        return this.confirmLabel$;
    }

    getCancelLabelObservable() {
        return this.cancelLabel$;
    }
}