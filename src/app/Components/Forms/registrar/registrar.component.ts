import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import { UsuariosModel } from 'src/app/Models/UsuariosModel';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent {

  constructor(private fb: FormBuilder, public api: RestService ) {
        
  }

  infoUsuarios: UsuariosModel = {
    IdUsuario: 0,
    TipoDocumento: "",
    IdRol: 0,
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Ciudad: "",
    Pais: "",
    Telefono: "",
    Email: "",
    Password:"",
    //FechaCumpleanos:"",
  }
  
  hide = true; 
  //private fb = inject(FormBuilder);
  UsuariosForm = this.fb.group({
    company: null,
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    idUsuario: ["", Validators.required],
    direccion: ["", Validators.required],
    ciudad: ["", Validators.required],
    pais: ["", Validators.required],
    telefono: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    email: ["", [Validators.required, Validators.email, Validators.pattern ]],
    password: ["", Validators.required] , 
    
  });

  hasUnitNumber = false;

 
  onSubmit(): void {
    if(this.UsuariosForm.valid){
      
      
      

      this.api.Post("Usuario",this.UsuariosForm)

      
      
    }else{
      Swal.fire(
        'Debe ingresar los datos requeridos!',
        'Complete la información!',
        'error'
      );

    }
    alert('Thanks!');
  }
  
 
}
