import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    constructor() { }

    dateISOtoPtBr(dateISO: string | null): string {
        if (!dateISO) {
            return '';
        }

        const data = new Date(dateISO);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(data);
    }
}
