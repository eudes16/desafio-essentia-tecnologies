import { Component, inject } from '@angular/core';
import { DialogService } from '../../../../services/dialog-service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
    protected dialogService = inject(DialogService);

    protected visible = false;

    protected severity = this.dialogService.getSeverity();
    protected title =  this.dialogService.getTitle();
    protected message = this.dialogService.getMessage();

    protected cancelLabel = this.dialogService.getCancelLabel();
    protected confirmLabel = this.dialogService.getConfirmLabel();

    protected closeDialog() {
        this.dialogService.close();
    }

    protected confirmDialog() {
        this.dialogService.confirm();
    }


    ngOnInit() {
        this.dialogService.visible$.subscribe(visible => {
            this.visible = visible;
        });

        this.dialogService.severity$.subscribe(severity => {
            this.severity = severity;
        });

        this.dialogService.title$.subscribe(title => {
            this.title = title;
        });

        this.dialogService.message$.subscribe(message => {
            this.message = message;
        });
    }

}
