import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';

import { MatDialog, } from '@angular/material/dialog';
import { RegistrarComponent } from '../Forms/registrar/registrar.component';


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

  titulo="Algunos de nuestros clientes satisfechos"
  constructor(public api: RestService, public dialog: MatDialog ) {
    
  }

  ngOnInit(): void {
    this.api.Get("Usuarios").then((res)=>{
      this.loadTable(res)
      this.dataSource.data=res
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
    
    const dialogRef = this.dialog.open(RegistrarComponent);
      dialogRef.afterClosed().subscribe(res => {        
      console.log(`Dialog result: ${res}`);
    });
  }
  
  editar(element){
    console.log('cambiar dato');
  }  
  borrar(element){
    console.log('borrar dato');
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

