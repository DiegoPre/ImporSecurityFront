import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
//post
  public async Post(controlador:string, objet:any){
    return await this.api.post(this.Ulr+controlador, objet).subscribe((res)=>{});
      
  }
//update
  public async Update(controlador:string, id: string, objet:any){
    return await this.api.put(this.Ulr+controlador+"/"+ id, objet);
      
  }
  
  //Delete
  public async Delete(controlador:string, id: string){
    var response: any
    return await this.api.delete(this.Ulr+controlador+"/"+ id).toPromise().then((res =>{
      response = res;
    }))
    return response;
          
  }
}
