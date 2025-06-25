import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dialog } from "./shared/components/feedback/dialog/dialog";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Dialog],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected title = 'app';

}
