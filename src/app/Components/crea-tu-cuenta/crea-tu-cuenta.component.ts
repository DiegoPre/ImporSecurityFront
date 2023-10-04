import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-crea-tu-cuenta',
  templateUrl: './crea-tu-cuenta.component.html',
  styleUrls: ['./crea-tu-cuenta.component.css']
})
export class CreaTuCuentaComponent implements OnInit{
  titulo="SEA PARTE DE NUESTROS CLIENTES SATISFECHOS"
  
  constructor(public api: RestService){

  }

  ngOnInit(): void {   
    this.api.Get("Usuarios");
    this.api.Post("usuarios", "idUsuario");
  }
  
}
