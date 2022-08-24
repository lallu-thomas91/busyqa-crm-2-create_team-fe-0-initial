import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 username: string = '';
 mode: string = '';

  constructor( private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService ) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.params['mode'];

    setTimeout(() => {
      if (this.mode != null){
        this.mode = '';
        // this.router.navigate(['/login']);
      }    
    }, 5000);
  }

  onSubmit(inputUser: User){
      
    this.loginUser(inputUser);
  }

  private loginUser(inputUser: User): void{
    this.username = inputUser.username;
    this.userService.authenticateUser(inputUser)
          .subscribe({
            next:(response) => {
              console.log("Response:" + response);
              this.userService.authenticated = true;
              this.router.navigate(['/welcome/', this.username])
            },
            error:(err: HttpErrorResponse) => {
              if(err.status === 401){
                console.log("Authentication failed. Login unsuccessful! Error: " + err.status);
                this.mode = 'error:authentication_failed';
              }
              else{
                console.log("Something went wrong! Error: " + err.status);
                this.mode = 'error';
              }
              this.userService.authenticated = false;
              this.router.navigate(['/login/',this.mode]);
            }
          });

  }

}
