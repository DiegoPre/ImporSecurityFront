import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api: HttpClient) {}

  public async Get (){
    await this.api.get("https://localhost:7152/api/Usuarios").toPromise().then((res=>{
     console.log(res);}))
  }


}
