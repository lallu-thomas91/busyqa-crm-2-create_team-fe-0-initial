import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user: User = <User>{};
  username: string ='';
  name: string ='';
  mode: string ='';

  constructor( private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService) { 

    }

  ngOnInit(): void {

    this.username = String(sessionStorage.getItem('username'));
    this.userService.findUser(this.username)
            .subscribe({
              next: (user) => {
                console.log("Logged in and fetching the current user details from server: " 
                          + user.username);
                this.user = user;
                this.name = this.user.firstName + " " + this.user.lastName;
              }, 
              error: (err) => {
                console.log("Error: unable to fetch user details. " + err);
              }
            });

  }


}
