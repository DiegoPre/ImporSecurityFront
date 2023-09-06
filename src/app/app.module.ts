import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ContactenosComponent } from './Components/contactenos/contactenos.component';
import { NosotrosComponent } from './Components/nosotros/nosotros.component';
import { NuestrosClientesComponent } from './Components/nuestros-clientes/nuestros-clientes.component';
import { CreaTuCuentaComponent } from './Components/crea-tu-cuenta/crea-tu-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductosComponent,
    ContactenosComponent,
    NosotrosComponent,
    NuestrosClientesComponent,
    CreaTuCuentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
