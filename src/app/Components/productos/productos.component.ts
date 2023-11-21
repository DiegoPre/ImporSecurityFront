import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
//import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarProductComponent } from '../Forms/registrar-product/registrar-product.component';
import { ProductosModel } from 'src/app/Models/ProductosModel';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/Services/Modal/producto.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  
})

export class ProductosComponent implements OnInit, AfterViewInit{
  titulos="BEST SELLER"
  displayedColumns: string[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(public api: RestService, public dialog: MatDialog, public productService: ProductoService) {
        
  }
  titulo=""
  accion="Registrar Producto"
  loading = false;  //variable para actualizar el ngOnInit

  ngOnInit() {
    this.loading = true;
      this.api.Get("Productoes").then((res)=>{
      this.loadTable(res)
      this.dataSource.data=res
      console.log(this.dataSource.data)
      this.loading = false;      
    })
  }
  // OpenDialog abre una ventana de un formulario vacio, y con el modal se trae un titulo y el nombre del submit para hacer un post
  openDialog(){
    this.productService.titulo = "Crear nuevo Producto"
    this.productService.accion.next("Crear Producto")
    const dialogRef = this.dialog.open(RegistrarProductComponent,{
      width:'850px',  
    });
    dialogRef.afterClosed().subscribe(res =>{  //cerrar y limpiar el openDialog()
      console.log('The dialog was closed'+res);
      this.ngOnInit();
    })    
  }

  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;    
  }
  //genera el contenido de la tabla de acuerdo a lo que recibe del backend .NET
  loadTable(data:any[]){
    this.displayedColumns=[];
    for (let column in data[0]){
      this.displayedColumns.push(column);
    }
    this.displayedColumns.push('Acciones');
    console.log("this.displayedColumns");    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  //debe traer el formulario con los datos del registro y habilitado para ser editado, se trae el título y la acción de hacer un PUT
  async editar(element: any){
    const Id = element.idProducto;
    this.productService.titulo="Editar Producto"
    this.productService.accion.next("Editar Producto"); 
    
    try {
      const productoData = await this.api.Get("Productoes/" + Id);
      this.productService.producto=productoData;

      //const categoriaData = await this.api.Get("CategoriaProductoes/" + productoData.id);
      //this.productService.categoria =categoriaData;

      //this.productService.producto = element
      const dialogRef= this.dialog.open(RegistrarProductComponent, {
          height: 'auto',
          width: 'auto'
      }); 
      dialogRef.afterClosed().subscribe(res =>{
        console.log('El dialogo fue cerrado'+res);
        this.ngOnInit();
      })      
    } catch (error) {
      console.error('Error al obtener el registro: ',error);
    }         
   
  }

 
  async borrar(element: any){    
    Swal.fire({
      title: "Esta seguro de eliminar el registro?",
      text: "No podrá recuperarlo nuevamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimínelo!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        const Id = element.idProducto;
        console.log(Id);
        if(element !== undefined) {
          this.api.Delete("Productoes", Id).then((res) => {
            console.log(res);
            this.ngOnInit();
            console.log(res);
          }).catch((err) =>{
            console.log(err);
            Swal.fire(
              'Error',
              'Hubo un error al borrar el registro.',
              'error'
            );
          });
        }
      }
    });
  }


}
