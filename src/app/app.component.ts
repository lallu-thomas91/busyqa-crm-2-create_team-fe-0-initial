import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  username : String = '';

  authenticated = false;

  constructor(private userService: UserService,
              private teamService: TeamService){    
  }

  ngOnInit(): void {
     this.username = this.userService.username;
    console.log("getting current username & storing in username");
    this.authenticated = this.userService.authenticated;
  }
  
  
  onlogout(){
    this.userService.logout();
  }
}
