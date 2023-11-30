import { Component } from '@angular/core';
import { LocalStorageService } from './Services/local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Mi primer proyecto en ANGULAR, DIEGO PRECIADO';
  isLoggedIn: any;
  isRegistered: any;
  
  
  constructor(private localStorageServicio: LocalStorageService){
    this.isLoggedIn = this.localStorageServicio.getItem('isLoggedIn');
    this.isRegistered = this.localStorageServicio.getItem('isRegistered');

  }
}
