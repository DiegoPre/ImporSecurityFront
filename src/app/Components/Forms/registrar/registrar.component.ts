import { Component, OnInit, inject } from '@angular/core';
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
  
  titulo=""
  accion=""

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
    //FechaCumpleanos: new Date,
  }
  
  hide = true; 
  //private fb = inject(FormBuilder);
  UsuariosForm = this.fb.group({
    company: null,
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    TipoDocumento: ["", Validators.required],
    idUsuario: [0, Validators.required],
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
      this.infoUsuarios.Nombre=this.UsuariosForm.controls['nombre'].value
      this.infoUsuarios.Apellido = this.UsuariosForm.controls['apellido'].value
      this.infoUsuarios.TipoDocumento = this.UsuariosForm.controls['TipoDocumento'].value
      this.infoUsuarios.IdUsuario = this.UsuariosForm.controls['idUsuario'].value
      this.infoUsuarios.Direccion = this.UsuariosForm.controls['direccion'].value
      this.infoUsuarios.Ciudad = this.UsuariosForm.controls['ciudad'].value
      this.infoUsuarios.Pais = this.UsuariosForm.controls['pais'].value
      this.infoUsuarios.Telefono = this.UsuariosForm.controls['telefono'].value
      this.infoUsuarios.Password = this.UsuariosForm.controls['password'].value
           
      this.api.Post("Usuario",this.UsuariosForm)
      Swal.fire(
        'Los datos están enviado!',
        'Buen trabajo!',
        'success'
      );      
      
    }else{
      Swal.fire(
        'Debe ingresar los datos requeridos!',
        'Complete la información!',
        'error'
      );

    }
    //alert('Thanks!');
  }
  
 
}
