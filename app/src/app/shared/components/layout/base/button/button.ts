import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.html',
    styleUrl: './button.css'
})
export class Button {

    @Input({ required: true }) label!: string;
    @Input({ required: true }) class!: string;
    @Input() id: string | undefined;
    @Input() disabled: boolean = false;
    @Input() icon: string | undefined;
    @Input() loading: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';

    @Output() onClick: (event: MouseEvent) => void = () => {
        if (this.loading || this.disabled) {
            return;
        }

        console.log('Button onClick not implemented');
    };

    ngOnInit(): void {
    }


}
