import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: DataService, private route: Router) { }

  formGroup!: FormGroup;
  createUserData: any; 
  createUser!: string;
  ngOnInit(): void {

    this.formGroup = this.fb.group({

      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  createAccount(){
    console.log(this.formGroup.value)
    this.createUser = this.formGroup.value.username;
    console.log(this.createUser)
    this.data.addUser(this.formGroup.value).subscribe((data: any) => {
      this.createUserData = data;
      console.log(this.createUserData)
    },
    (error) =>{
      this.createUserData = error.error;
      console.log(this.createUserData);
    }
    )
  }
  login(){
    this.createUser = this.formGroup.value.username;
    if(this.createUserData == "user register successfuly"){
      this.route.navigate(["/login"]);
    }
  }

}
