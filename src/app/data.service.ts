import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  addUser(data: any){
    console.log(environment.apiURL);
    return this.http.post(environment.apiURL +'register', data);
  }

  loginUser(data: any){
    return this.http.post(environment.apiURL + 'login', data);
  }

  pwdReset(data: any){
    return this.http.post( environment.apiURL + 'forgot', data);
  }

  verfifyString(data: any){
    return this.http.post(environment.apiURL + 'verifyString', data);
  }

  resetPassword(data: any){
    return this.http.put(environment.apiURL + 'reset', data);
  }

}
