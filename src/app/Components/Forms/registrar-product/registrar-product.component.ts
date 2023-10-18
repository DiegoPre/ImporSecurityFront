import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductosModel } from 'src/app/Models/ProductosModel';
import { RestService } from 'src/app/Services/rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-product',
  templateUrl: './registrar-product.component.html',
  styleUrls: ['./registrar-product.component.css']
})
export class RegistrarProductComponent {
  constructor(private fb: FormBuilder, public api: RestService ) {
        
  }

  infoProductos: ProductosModel = {
    IdProducto: "",
    IdCategoria: 0,
    IdProveedor: "",
    NombreProducto: "",
    Descripcion: "",
    Marca: "",
    Origen: "",
    PrecioVenta: 0,
    Imagen:""
  }

  //private fb = inject(FormBuilder);
  ProductosForm = this.fb.group({
    nombreCategoria: [null, Validators.required],
    nombreProducto: ["", Validators.required],
    descripcion: ["", Validators.required],
    marca: ["", Validators.required],
    origen: ["", Validators.required],
    idProducto: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    precioVenta: [null, Validators.required],
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
    if(this.ProductosForm.valid){
      this.infoProductos.IdCategoria=this.ProductosForm.controls['nombreCategoria'].value
      this.infoProductos.NombreProducto=this.ProductosForm.controls['nombreProducto'].value
      this.infoProductos.IdProducto=this.ProductosForm.controls['idProducto'].value
      this.infoProductos.Descripcion=this.ProductosForm.controls['descripcion'].value
      this.infoProductos.Marca=this.ProductosForm.controls['marca'].value
      this.infoProductos.Origen=this.ProductosForm.controls['origen'].value
      this.infoProductos.PrecioVenta=this.ProductosForm.controls['precioVenta'].value
      this.infoProductos.Imagen=this.ProductosForm.controls['imagen'].value

      this.api.Post("Productoes",this.infoProductos)

      console.log(this.infoProductos);
      
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
