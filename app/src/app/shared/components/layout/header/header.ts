import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleList, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { environment } from '../../../../../environments/environment.development';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerLogin } from '@ng-icons/tabler-icons';

@Component({
    selector: 'app-header',
    imports: [FontAwesomeModule, NgIcon],
    templateUrl: './header.html',
    styleUrl: './header.css',
    providers: [provideIcons({ tablerLogin })]
})
export class Header {
    title = environment.appName;
    faRectangleList = faRectangleList;
    faUserCircle = faUserCircle;

}
