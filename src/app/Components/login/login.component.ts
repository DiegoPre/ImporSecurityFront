import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { UsuariosModel } from 'src/app/Models/UsuariosModel';
import { ProductoService } from 'src/app/Services/Modal/producto.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  titulo: String = "Inicio de Sesion";
  
  constructor(
    private fb: FormBuilder, 
    public api: RestService, 
    public productoService: ProductoService,
    private localStorageService: LocalStorageService) {      
    }

    loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],      
    });  

    onSubmit(): void{
      if(this.loginForm.valid){
        this.api.login(this.loginForm.controls['usuario'].value, this.loginForm.controls['password'].value).then(res =>{
          console.log(res)


  
        }).catch(err =>{
          Swal.fire(
            'Alerta',
            'error de inicio de sesión',
            'error'

          )
          console.log(err);
        })
      }
    }
  
    
  loggin() {
    this.localStorageService.setItem('isLoggedIn', false);
    this.localStorageService.setItem('isRegistered', true);
  }

}


