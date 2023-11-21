import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarModule } from 'ngx-avatars';
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
import { TableClientesComponent } from './Components/table-clientes/table-clientes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegistrarComponent } from './Components/Forms/registrar/registrar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './Components/product/product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrarProductComponent } from './Components/Forms/registrar-product/registrar-product.component';
import { RegistrarCatProductComponent } from './Components/Forms/registrar-cat-product/registrar-cat-product.component';
import { RegistrarOrdenCompraComponent } from './Components/Forms/registrar-orden-compra/registrar-orden-compra.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
//import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductosComponent,
    ContactenosComponent,
    NosotrosComponent,
    NuestrosClientesComponent,
    CreaTuCuentaComponent,
    TableClientesComponent,
    RegistrarComponent,
    ProductComponent,
    RegistrarProductComponent,
    RegistrarCatProductComponent,
    RegistrarOrdenCompraComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    AvatarModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
