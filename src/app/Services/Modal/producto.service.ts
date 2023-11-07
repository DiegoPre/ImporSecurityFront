import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductosModel } from 'src/app/Models/ProductosModel';
import { CategoriaModel } from 'src/app/Models/CategoriaModel';
import { UsuariosModel } from 'src/app/Models/UsuariosModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  producto: ProductosModel;
  categoria: CategoriaModel;
  usuario: UsuariosModel;

  
  titulo = "";
  accion = new BehaviorSubject(""); //variable dentro de un suscribe, monitoreada por interfaz BehaviorSu


  constructor() { }
}
