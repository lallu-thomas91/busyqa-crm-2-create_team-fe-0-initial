import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/team.model';
import { TeamService } from 'src/app/team.service';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  team : Team = <Team>{};
  idTeam : number = 0;
  username: String = '';
  validUsers: User[] = [];
  validUsernames: string[] = [];
  teamsize: number = 0;

  mode : String = '';
  error : string = '';

  newMemberusernames: Set<string> = new Set();  /* use Set which enables using delete fn to remove elements easily than Array*/
  addUsernames: string[] = [];    /* defined as array as it has index*/
  removeUsernames: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private teamService: TeamService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.url[1].path;
    console.log("Mode: ", this.mode);
    
    if (this.mode==="update") {
      this.idTeam = this.route.snapshot.params['idTeam'];
      this.fetchTeam(this.idTeam);
      this.fetchValidUsers(this.idTeam);
      
    }
  }

  onAddMembers(){
    // console.log("Added members to the team: ", this.idTeam, this.addUsernames);
    this.addUsernames.forEach(username => this.newMemberusernames.add(username));
    console.log("Members of the team after adding users: ", this.newMemberusernames);
  }

  onRemoveMembers(){
    this.removeUsernames.forEach(username => this.newMemberusernames.delete(username));
    console.log("Members of the team after removing users: ", this.idTeam, this.newMemberusernames);
  }

  onSubmit(team: Team){
    console.log(team);
    this.username = String(sessionStorage.getItem('username'));

    if (this.mode==="create") {
      team.createdby = this.username;
      this.createTeam(team);
    } 
    else if (this.mode==="update") {
      console.log("Add members " + this.newMemberusernames);
      
      team.memberUsernames = [];     /*Clearing old list of members */
      this.newMemberusernames.forEach(username => team.memberUsernames.push(username));
      
      console.log("New members added to team " + team.memberUsernames);
      this.updateTeam(team, this.idTeam);
    }
    else {
      console.log(`Type not found: ${this.mode}`);
    }
  }

  private createTeam (team: Team): void {
    this.teamService.createTeam(team)
              .subscribe({                
                next:(response) => {
                  console.log("Response:" + response);
                  this.router.navigate(['/teams','created']);
                },
                error:(err:HttpErrorResponse) => {
                  console.log("Error while creating team: " + err.status);
                  if(err.status === 500){
                    this.error = "Server error. Check if you have admin/manager previlege to create team";
                  }
                  else{
                  this.error = "unknown error";
                  }
                }});
  }

  private updateTeam (team: Team, idTeam: number): void {
    this.teamService.updateTeam(team, idTeam)
              .subscribe({                
                  next:(response) => {
                    console.log("Response:" + response);
                    this.router.navigate(['/teams','updated']);
                  },
                  error:(err:HttpErrorResponse) => {
                    console.log("Error while creating team: " + err.status);
                    if(err.status === 500){
                      this.error = "Server error. Couldn't update team";
                    }
                    else{
                    this.error = "Something went wrong. Couldn't update team.";
                    }
                  }});
  }

  private fetchTeam(idTeam: number){
    console.log("Fetching details of team with id ", idTeam);
    this.teamService.fetchTeam(idTeam)
              .subscribe(team => {
                this.team = team;
                this.teamsize = this.team.memberUsernames.length;
                this.team.memberUsernames.forEach(username => this.newMemberusernames.add(username));
                console.log("Members of the fetched team: ", this.newMemberusernames);
              });
  }

  private fetchValidUsers(idTeam: number){
    console.log("Fetching valid list of users available to add to team ", idTeam);
    this.userService.listValidUsers(idTeam)
              .subscribe(users =>{
                this.validUsers = users;
                users.forEach(validUser => 
                  this.validUsernames.push(validUser.username))
              });
  }

}
