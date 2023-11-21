import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  email = 'unknow';
 // constructor(private localStorageService: LocalStorageService, private router: Router ){
   // this.nombre = localStorageService.getItem("nombre")
  //}
  constructor(private localStorageService: LocalStorageService, private router: Router) {
    const storedNombre = localStorageService.getItem("email");
    this.email = storedNombre !== null ? storedNombre : 'unknown';
  }
  

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    cerrarSesion(){
      this.localStorageService.setItem('isLoggedIn', false);
      this.localStorageService.setItem('isRegistered', false);
      this.router.navigate(['/']);
      //location.reload();
    }  


}
