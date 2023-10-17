import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent {
  hide = true; 
  private fb = inject(FormBuilder);

  addressForm = this.fb.group({
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
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

 

  onSubmit(): void {
     Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  );
  }
  
 
}
