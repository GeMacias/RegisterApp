import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserRegister } from './user';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  isLoggedIn = false;
  session: any = {user: "Anonymous", token: "none"};
  apiURL = 'http://localhost:8000/api-auth/'
  httpOptions = {headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    observe: 'response' as 'response'
    };
  
  constructor(private router:Router, private http: HttpClient) { }

  login(user: User) {


    this.http.post(this.apiURL + 'login', user, this.httpOptions).subscribe((response) => {
      if (response.ok) {
        this.isLoggedIn = true;
        this.session = response.body;
        this.router.navigate(['/login']);
      } 
    });
  }
  register(userRegister: UserRegister) {


    this.http.post(this.apiURL + 'signup', userRegister, this.httpOptions).subscribe((response) => {
      if (response.ok) {
        this.isLoggedIn = true;
        this.session = response.body;
        this.router.navigate(['/home']);
      } 
    });
  }
  canActivate(){
    this.router.navigate(['home']);
    return true;
  }
}
