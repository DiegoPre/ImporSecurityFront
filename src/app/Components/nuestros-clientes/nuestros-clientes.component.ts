import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';


@Component({
  selector: 'app-nuestros-clientes',
  templateUrl: './nuestros-clientes.component.html',
  styleUrls: ['./nuestros-clientes.component.css']
})
export class NuestrosClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombreRol', 'apellido', 'nombre', 'telefono', 'email', 'ciudad'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  titulo="Algunos de nuestros clientes satisfechos"
  constructor(public api: RestService ) {
    
  }

  ngOnInit(): void {
    this.api.Get("Usuarios").then((res)=>{
      this.dataSource.data=res
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

