import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  user: User = <User>{};
  mode: String ='';
  usernameExists: boolean = false;
  inputUsername: String ='';
  

  constructor ( private router: Router,
                private route: ActivatedRoute, 
                private userService: UserService) { }

  ngOnInit(): void {
  }

 
   onSubmit(user: User){
    
    console.log(user);

    this.signupUser(user);
  }

  private signupUser(user: User): void{
    this.userService.signupUser(user)
      .subscribe({
        next:(response) => {
          console.log("Response:" + response);
          this.mode = 'signup_success';
          this.router.navigate(['/login',this.mode]);
        },
        error:(err:HttpErrorResponse) => {
          console.log("Error while signing up: " + err.message);
          this.mode = 'signup_error';

        }});
  }

  onCheckUsernameExists(username: String){
    this.inputUsername = username;
    this.userService.checkUsernameExists(this.inputUsername)
      .subscribe((user) => {
        if(user!=null){
          this.usernameExists = true;
        }
        else{
          this.usernameExists = false;
        }
      });

  }

}
