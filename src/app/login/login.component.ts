import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private data: DataService, private route: Router, private modalService: NgbModal) { }
  formGroup!: FormGroup;
  loginResponse!: string; 
  
  modal = "exampleModal"
  closeResult!: string;

  ngOnInit(): void {

    this.formGroup = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  loginAccount(){
    console.log(this.formGroup.value)
    this.data.loginUser(this.formGroup.value).subscribe((data: any) => {
      this.loginResponse = data;
      console.log(this.loginResponse);
      this.route.navigate(["/dashboard"]);
    },
    (error) =>{
      this.loginResponse = error.error;
      console.log(this.loginResponse);
      $("#exampleModal").modal('show');

      setTimeout( () => {
        $('#exampleModal').modal('hide');
     }, 1000);

    }
    )
  }

  

  login(){
      this.route.navigate(["/login"]);
  }

}
