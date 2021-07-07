import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
      this.modalService.open(this.loginResponse, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  login(){
      this.route.navigate(["/login"]);
  }

}
