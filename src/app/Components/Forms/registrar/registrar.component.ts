import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import { UsuariosModel } from 'src/app/Models/UsuariosModel';
import { ProductoService } from 'src/app/Services/Modal/producto.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit{

  constructor(
    private fb: FormBuilder, 
    public api: RestService,  
    public productoService: ProductoService,
    private localStorageService: LocalStorageService ) { 
      
      this.habilitado = localStorageService.getItem("isRegistered")         
  }
  
  titulo=""
  accion=""
  habilitado: boolean = true;
  loading: boolean = false

  infoUsuarios: UsuariosModel = {
    IdUsuario: 0,
    TipoDocumento: "",
    IdRol: 2,
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Ciudad: "",
    Pais: "Colombia",
    Telefono: "",
    Email: "",
    Password:"",
    //FechaCumpleanos: new Date,
  }
  
  hide = true;
  hasUnitNumber = false;
  
  UsuariosForm = this.fb.group({
    company: null,
    idUsuario: [0, [Validators.required, Validators.pattern('^[0-9]+$')]],
    tipoDocumento: ["", Validators.required],
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    direccion: ["", Validators.required],
    ciudad: ["", Validators.required],
    pais: ["", Validators.required],
    telefono: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required] , 
    
  });

  //solicitar los datos asincrónicos del servicio y setearlos con el requerido por el formulario
   ngOnInit(): void{
    this.titulo = this.productoService.titulo
    this.accion = this.productoService.accion.value
    if(this.productoService.accion.value == 'Editar Cliente'){
      console.log(this.productoService.usuario);
      this.UsuariosForm.controls['nombre'].setValue(
        this.productoService.usuario.Nombre + '');
      this.UsuariosForm.controls['apellido'].setValue(
        this.productoService.usuario.Apellido + '');
      this.UsuariosForm.controls['tipoDocumento'].setValue(
        this.productoService.usuario.TipoDocumento + '');
      this.UsuariosForm.controls['idUsuario'].setValue(
        this.productoService.usuario.IdUsuario );
      this.UsuariosForm.controls['direccion'].setValue(
        this.productoService.usuario.Direccion + '');
      this.UsuariosForm.controls['ciudad'].setValue(
        this.productoService.usuario.Ciudad + '');
      this.UsuariosForm.controls['telefono'].setValue(
        this.productoService.usuario.Telefono + '');
      this.UsuariosForm.controls['email'].setValue(
        this.productoService.usuario.Email + '');
      this.UsuariosForm.controls['password'].setValue(
        this.productoService.usuario.Password + '');
      
      this.titulo = this.productoService.titulo; //Carga el título del dialog
    }
  }

  //Boton para validar información del formulario de productos con la DB
  async onSubmit(){
    try{
      if(this.UsuariosForm.valid){
        this.loading = true;
        if(this.productoService.accion.value == "Editar Cliente" ){
          this.infoUsuarios.IdUsuario = this.UsuariosForm.controls['idUsuario'].value
          this.infoUsuarios.TipoDocumento = this.UsuariosForm.controls['tipoDocumento'].value
          this.infoUsuarios.Nombre=this.UsuariosForm.controls['nombre'].value
          this.infoUsuarios.Apellido = this.UsuariosForm.controls['apellido'].value
          this.infoUsuarios.Direccion = this.UsuariosForm.controls['direccion'].value
          this.infoUsuarios.Ciudad = this.UsuariosForm.controls['ciudad'].value
          this.infoUsuarios.Pais = this.UsuariosForm.controls['pais'].value
          this.infoUsuarios.Telefono = this.UsuariosForm.controls['telefono'].value
          this.infoUsuarios.Email = this.UsuariosForm.controls['email'].value
          this.infoUsuarios.Password = this.UsuariosForm.controls['password'].value
  
          this.api.Update("Usuario", this.infoUsuarios.IdUsuario.toString(), this.infoUsuarios) //controlador, 
          Swal.fire(
            'Los datos se han enviado!',
            'Ya está actualizado!',
            'success'
          );
          console.log()
        }else{
          this.infoUsuarios.IdUsuario = this.UsuariosForm.controls['idUsuario'].value
          this.infoUsuarios.TipoDocumento = this.UsuariosForm.controls['tipoDocumento'].value
          this.infoUsuarios.Nombre=this.UsuariosForm.controls['nombre'].value
          this.infoUsuarios.Apellido = this.UsuariosForm.controls['apellido'].value
          this.infoUsuarios.Direccion = this.UsuariosForm.controls['direccion'].value
          this.infoUsuarios.Ciudad = this.UsuariosForm.controls['ciudad'].value
          this.infoUsuarios.Pais = this.UsuariosForm.controls['pais'].value
          this.infoUsuarios.Telefono = this.UsuariosForm.controls['telefono'].value
          this.infoUsuarios.Email = this.UsuariosForm.controls['email'].value
          this.infoUsuarios.Password = this.UsuariosForm.controls['password'].value
             
          this.api.Post("Usuario",this.UsuariosForm)
          Swal.fire(
            'Los datos se han registrado!',
            'Ya está creado!',
            'success'
          );  
        }
      }
    } catch (err){
      Swal.fire(
        'Hay problemas para cargar los datos!',
        'Error en sistema!',
        'error'
      );
    } finally {
      this.loading = false;
    }
  }

  realizarAccion(){
    this.localStorageService.setItem('isLoggedIn', false);
    this.localStorageService.setItem('isRegistered', false);
    location.reload();
  }
  
 
}


