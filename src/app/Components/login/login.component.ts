import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/Services/Modal/producto.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  titulo: String = "Inicio de Sesion";
  loading: Boolean = false;
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    public api: RestService, 
    public router: Router,
    public productoService: ProductoService,
    private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
      this.initForm();
    }

    initForm() {
      this.loginForm = this.fb.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      });
    }   

    onSubmit(): void{
      if(this.loginForm.valid){
        this.loading = true;
        this.api.login(this.loginForm.controls['usuario'].value, this.loginForm.controls['password'].value).then(res =>{
          console.log(res[0].nombre);
          this.localStorageService.setItem('nombre', res[0].nombre );
          this.localStorageService.setItem('isLoggedIn', true);
          this.localStorageService.setItem('isRegistered', false);
          location.reload();
          this.loading = false;
  
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

    recuperarPassword(){

    }
  

}


