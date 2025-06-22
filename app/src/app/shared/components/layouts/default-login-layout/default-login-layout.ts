import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-default-login-layout',
    imports: [ButtonModule, DividerModule, PanelModule],
    templateUrl: './default-login-layout.html',
    styleUrl: './default-login-layout.scss'
})
export class DefaultLoginLayout {
    @Input() title = '';
    @Input() primaryButtonText = '';
    @Input() secondaryButtonText = '';
    @Input() primaryButtonDisabled = true;

    @Output('submit') onSubmit = new EventEmitter();
    @Output('navigate') onNavigate = new EventEmitter();

    submit() {
        this.onSubmit.emit();
    }

    navigate() {
        this.onNavigate.emit();
    }
}
