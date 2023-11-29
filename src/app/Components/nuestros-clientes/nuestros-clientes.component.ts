import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
import { MatDialog, } from '@angular/material/dialog';
import { RegistrarComponent } from '../Forms/registrar/registrar.component';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/Services/Modal/producto.service';


@Component({
  selector: 'app-nuestros-clientes',
  templateUrl: './nuestros-clientes.component.html',
  styleUrls: ['./nuestros-clientes.component.css']
})

export class NuestrosClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  titulos="Algunos de nuestros clientes satisfechos"
  constructor(public api: RestService, public dialog: MatDialog, public productService: ProductoService ) {
    
  }

  titulo=""
  accion="Crear Usuario"
  loading = false;  //variable para mostrar spinning actualizar el ngOnInit


  ngOnInit(){    
    this.loading = true;
    this.api.Get("Usuarios").then((res)=>{
      this.loadTable(res)
      this.dataSource.data=res
      console.log(this.dataSource.data)
      this.loading = false;
    })
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadTable(data:any[]){
    this.displayedColumns=[];
    for (let column in data[0]){
      this.displayedColumns.push(column);
    }
    this.displayedColumns.push('Acciones');
    console.log("this.displayedColumns");    
  }

  openDialog() {
    this.productService.titulo = "Crear Usuario"
    this.productService.accion.next("Crear Usuario")
    const dialogRef = this.dialog.open(RegistrarComponent,{
      width:'750px',  
    });
    dialogRef.afterClosed().subscribe(res =>{  //cerrar y limpiar el openDialog()
      console.log('The dialog was closed'+res);
      this.ngOnInit();
    })    
  }
  
  async editar(element: any){
    const Id = element.idUsuario;
    this.productService.titulo="Editar Cliente"
    this.productService.accion.next("Editar Cliente"); 
    
    try {
      const usuarioData = await this.api.Get("Usuarios/" + Id);
      this.productService.usuario=usuarioData;
      //this.productService.usuario = element
      const dialogRef= this.dialog.open(RegistrarComponent, {
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
        const Id = element.idUsuario;  ////////////verifivar. id
        console.log(Id);
        if(element !== undefined) {
          this.api.Delete("Usuarios", Id).then((res) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

