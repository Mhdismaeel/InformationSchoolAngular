import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser } from '../Interfaces/create-user';
import { Role } from '../Interfaces/role';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api_root="http://localhost:58099/api/";
  AreportProgress:boolean;
  Aobserve:string;
  httpOptions = {
    headers: new HttpHeaders({
      'encType': 'multipart/form-data',
      'Accept':'application/json'

    })

  }

  constructor(private http:HttpClient) { }

   CreateSystemUser(user:any):Observable<any>
   {

     return this.http.post<any>(this.api_root+'Auth/AdminRegister',user,{headers: new HttpHeaders({
      'encType': 'multipart/form-data',
      'Accept':'application/json'

    }),reportProgress:true,observe:'events'});


   }

   GetRole():Observable<Role[]>
   {
     return this.http.get<Role[]>(this.api_root+'Admin/GetRoles',this.httpOptions);
   }






}
