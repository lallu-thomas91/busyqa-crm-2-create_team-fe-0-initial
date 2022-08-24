import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  listTeams(){
    return this.http
		         .get<Team[]>(
              environment.host + '/teams');
  }

  fetchTeam(idTeam: number) {
	  return this.http
		         .get<Team>(environment.host + '/team/' + idTeam);
  }

  createTeam(team: Team){
    return this.http
              .post<Team>(environment.host + '/teams', team);
  }

  updateTeam(updatedTeam: Team, idTeam: number){
    console.log("sending updated team details to server ", updatedTeam)
    return this.http
              .put<Team>(environment.host + '/team/update/' + idTeam, updatedTeam);
  }

  deleteTeam(idTeam: number){
    return this.http
              .delete(environment.host + '/team/' + idTeam);
  }

  // addMember(usernames: Array<string>, teamname: string){
  //   return this.http
  //             .put(environment.host + '/teams/' + teamname +'/add', usernames);
  // }

  // removeMember(username: string, teamname: string){
  //   return this.http
  //             .put(environment.host + '/teams/' + teamname +'/remove', username);
  // }

}
