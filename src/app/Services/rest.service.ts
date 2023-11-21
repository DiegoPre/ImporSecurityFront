import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../Components/login/login.component';
//import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }
  
  Ulr="https://localhost:7152/api/"
  
//get
  public async Get(controlador:string){
    var response:any
    await this.api.get(this.Ulr+controlador).toPromise().then(res=>{
      response=res;
      console.log(res);
    })
    return response;
  }
//post crea el registro desde un formulario
  public async Post(controlador:string, body:any){
    return await this.api.post(this.Ulr+controlador, body).subscribe((res)=>{});      
  }
  
//actualiza información en DB
  public async Update(controlador:string, id: string, body:any){
    return await this.api.put(this.Ulr+controlador+"/"+ id, body).toPromise().then((res)=>{});
      
  }
  
  //Delete
  public async Delete(controlador:string, id: string){
    var response;
    return await this.api.delete(this.Ulr+controlador+"/"+ id).toPromise().then((res =>{
      response = res;
    }));
    return response;
          
  }

  public async login(usuario: string, password: string) {
    var response;
    await this.api.get(this.Ulr+"Usuarios"+"/"+usuario+","+password).toPromise().then(res => {
      response = res;
      console.log(response);
      
   localStorage.setItem("usuario",response[0].email)
      
    });
    return response;
  }
  
  
}
