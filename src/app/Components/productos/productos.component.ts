import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
//import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrarProductComponent } from '../Forms/registrar-product/registrar-product.component';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  
})

export class ProductosComponent implements OnInit, AfterViewInit{
  titulo="BEST SELLER"
  displayedColumns: string[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(public api: RestService, public dialog: MatDialog ) {
        
  }

  ngOnInit(): void {
    this.api.Get("Productoes").then((res)=>{
      this.loadTable(res)
      this.dataSource.data=res
      
    })
  }

  openDialog(){
    this.dialog.open(RegistrarProductComponent,{
      width:'850px',  
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator=this.paginator;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editar(element){
    console.log('cambiar dato');
  }
  
  borrar(element){
    console.log('borrar dato');
  }
}
