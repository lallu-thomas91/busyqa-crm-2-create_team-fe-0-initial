import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamsComponent } from './teams/teams.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { GithublinkComponent } from './githublink/githublink.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome/:username', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:mode', component: LoginComponent },
  { path: 'teams/:mode', component: TeamsComponent },
  { path: 'team/create', component: EditTeamComponent },
  { path: 'team/update/:idTeam', component: EditTeamComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    GithublinkComponent,
    TeamsComponent,
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
