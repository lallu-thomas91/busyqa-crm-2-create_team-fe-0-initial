import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authToken = sessionStorage.getItem('token');
    
    if (authToken){
      request = request.clone({
        setHeaders:{Authorization : authToken }
      });
    }
    else{
      request = request.clone();
    }
    return next.handle(request).pipe(
      catchError(
        (err:HttpErrorResponse)=>{
          console.log("Error processing the request" + err.status);
          if(err.status===401){
            this.router.navigate(['/login']);
          }
          return throwError(()=> "Ooops...!!! Something went wrong...!!!")
        }
      )
    );
  } 
}
