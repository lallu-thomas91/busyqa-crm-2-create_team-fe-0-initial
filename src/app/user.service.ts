import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  username: string = '';
  mode: string = '';

  authenticated = false;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) { }

  signupUser(user: User){
    return this.http
            .post<User>(
              environment.host + '/signup', user);
  }


  authenticateUser(inputUser: User){
    
    const header = new HttpHeaders(inputUser ? {
                    authorization: 'Basic ' + btoa(inputUser.username + ':' 
                    + inputUser.password)
                    }:{});
    return this.http
                .get<any>(
                  environment.host + '/login', {headers: header})
                  .pipe(
                    map(response => {
                      sessionStorage.setItem('username', inputUser.username);
                      let tokenstr = "Basic " + btoa(inputUser.username + ':' 
                                      + inputUser.password);
                      sessionStorage.setItem('token', tokenstr);
                      this.username = String(sessionStorage.getItem('username'));
                      this.authenticated = true;
                      return response;
                    }),
                  ) ;
  }

  checkUsernameExists(username: String){
    return this.http
		         .get<User>(
              environment.host + '/check/' + username);
  }


  findUser(username: string){
    return this.http
		         .get<User>(
              environment.host + '/welcome/' + username);
  }

  listValidUsers(idTeam: number){
    return this.http
            .get<User[]>(environment.host + '/users/' + idTeam);
  }

  logout() {
    return this.http.post(environment.host + '/logout', {})
    .subscribe(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      console.log("Logging out and clearing authentication for the current user from session");
      this.username = '';
      this.authenticated = false;
      this.mode = 'logout_success';
      this.router.navigate(['/login/', this.mode]);
    });  
  }

}
