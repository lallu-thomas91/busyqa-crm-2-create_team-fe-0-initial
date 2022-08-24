import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../team.model';
import { TeamService } from '../team.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  
  mode: String ='';
  username: String = '';
  teams : Team[] = [];
  team : Team = <Team>{};
  memberUsernames : String[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService,
    private teamService: TeamService) { }

  ngOnInit(): void {
    this.username = String(sessionStorage.getItem('username'));
    this.listTeams();
    
    this.mode = this.route.snapshot.params['mode'];
    
    setTimeout(() => {
      this.mode = '';
    }, 5000);
  }

  onDeleteTeam(idTeam:number){
    this.teamService.deleteTeam(idTeam)
        .subscribe(() => {
          this.listTeams();
          
          this.mode = 'deleted';
          setTimeout(() => {
            this.mode = '';
          }, 5000);
        });
          
  }

  private listTeams(): void{
    this.teamService.listTeams()
        .subscribe(teams => {
          this.teams = teams;
          teams.forEach(team => this.memberUsernames = team.memberUsernames)
        });
  }


  

}
