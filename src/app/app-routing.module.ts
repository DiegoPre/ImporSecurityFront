import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaTuCuentaComponent } from './Components/crea-tu-cuenta/crea-tu-cuenta.component';
import { ContactenosComponent } from './Components/contactenos/contactenos.component';
import { NosotrosComponent } from './Components/nosotros/nosotros.component';
import { NuestrosClientesComponent } from './Components/nuestros-clientes/nuestros-clientes.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ProductComponent } from './Components/product/product.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {path:"CreaTuCuenta", component:CreaTuCuentaComponent},
  {path:"Contactenos", component:ContactenosComponent},
  {path:"Nosotros", component:NosotrosComponent},
  {path:"NuestrosClientes", component:NuestrosClientesComponent},
  {path:"Productos", component:ProductosComponent},
  {path:"Product", component:ProductComponent},
  {path:"Login", component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
