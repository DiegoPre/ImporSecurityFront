import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrar-product',
  templateUrl: './registrar-product.component.html',
  styleUrls: ['./registrar-product.component.css']
})
export class RegistrarProductComponent {

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    nombreCategoria: ["", Validators.required],
    nombreProducto: ["", Validators.required],
    descripcion: ["", Validators.required],
    marca: ["", Validators.required],
    origen: ["", Validators.required],
    idProducto: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    precioVenta: ["", Validators.required],
    imagen: [null ]
  });

  hasUnitNumber = false;

  cats = [
    {name: 'Productos vendidos'},
    {name: 'Barras de luz'},
    {name: ' Minibarra de luz'},
    {name: 'Luces Perimetrales'},
    {name: 'Luces Interiores'},
    {name: 'Señalizador Tráfico'},
    {name: 'Luces Strobos'},
    {name: 'Luces Exploradoras'},
    {name: 'Linternas'},
    {name: 'Sirenas y Parlantes'},
    {name: 'Swicht'}
    ];

  onSubmit(): void {
    alert('Thanks!');
  }
}
