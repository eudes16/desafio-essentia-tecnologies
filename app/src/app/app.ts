import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { Header } from "./shared/components/layout/header/header";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: []
})
export class App {

}
