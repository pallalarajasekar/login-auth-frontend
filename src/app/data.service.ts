import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  addUser(data: any){
    return this.http.post('http://localhost:3000/register', data);
  }

  loginUser(data: any){
    return this.http.post('http://localhost:3000/login', data);
  }

}
