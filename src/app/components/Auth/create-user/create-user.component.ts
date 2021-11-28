import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, subscribeOn } from 'rxjs';
import { CreateUser } from 'src/app/Interfaces/create-user';
import { Role } from 'src/app/Interfaces/role';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  CreateUserForm:FormGroup;
  RoleList:Role[];
  public progress: number;
  public message: string;

  constructor(private dataService:DataService,private fb:FormBuilder) {

   this.CreateUserForm=this.fb.group({
     firstName:['',Validators.required],
     lastName:['',Validators.required],
     username:['',Validators.required],
     email:['',Validators.email],
     password:['',Validators.required],
     phoneNumber:['',Validators.required],
     address:['',Validators.required],
     imageProfile:[''],
     roleName:['',Validators.required],
     avatar:[null]
   });
  }
  get UserForm()
  {
    return this.CreateUserForm;
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.CreateUserForm.patchValue({
      avatar: file
    });
    this.CreateUserForm.get('avatar').updateValueAndValidity()
    this.progress=100;
    this.message="Uploaded done.."
  }

  submitForm() {
    if(this.CreateUserForm.invalid)
    {
       alert("Please check your form");
       return;
    }
    var formData: any = new FormData();
    formData.append("firstName", this.CreateUserForm.get('firstName').value);
    formData.append("lastName", this.CreateUserForm.get('lastName').value);
    formData.append("username", this.CreateUserForm.get('username').value);
    formData.append("email", this.CreateUserForm.get('email').value);
    formData.append("password", this.CreateUserForm.get('password').value);
    formData.append("phoneNumber", this.CreateUserForm.get('phoneNumber').value);
    formData.append("roleName", this.CreateUserForm.get('roleName').value);
    formData.append("avatar", this.CreateUserForm.get('avatar').value);
    formData.append("address", this.CreateUserForm.get('address').value);

     this.dataService.CreateSystemUser(formData).subscribe((data:any)=>{

      this.CreateUserForm.reset();

     })





  }



    getRoles()
    {
      this.dataService.GetRole().subscribe((data:Role[])=>{
        this.RoleList=data;
        console.log(this.RoleList);
      })
    }



  ngOnInit(): void {
    this.getRoles();
  }






}
