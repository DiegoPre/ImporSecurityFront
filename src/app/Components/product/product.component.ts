import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  titulo="BEST SELLER"

  constructor(public api: RestService){

  }

  ngOnInit(): void {
   
    this.api.Get("Productoes");
  }

}
