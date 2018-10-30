import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { timeout } from 'q';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cbook-ui';
 
  users:User[];
  contactForm:FormGroup;
  user:User;
  message = "";
  submitted = false;
  constructor(private ds:DataService,private fb:FormBuilder){
    this.contactForm=this.fb.group({
        name:['',Validators.required],
        username:['',Validators.required],
        email:['',Validators.required]
       
    })
     this.getUsers();
  }
  get f(){
    return this.contactForm;
  }
  addContact(){
      this.submitted = true;
      if(this.contactForm.invalid){
           return;
      }
      this.user = <User>this.contactForm.value;
      
      this.ds.addContact(this.user).subscribe(data=>{
          this.message = data.name+" is added successfully";
          this.contactForm.reset();
          this.submitted = false;
          setTimeout(() => {
              this.message ="";
          }, 2000);
      });
  }

  getUsers(){
    this.ds.getUser().subscribe(data=>{
      this.users = data;
      this.users = this.listToMatrix(this.users,3);
    })
  }
  deleteUser(user:User){
    console.log(user);
  }


  listToMatrix(list, size) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result[i] = list.splice(0, size);
    }
    result[i] = list.splice(0, list.length);
    return result;
  }
}
