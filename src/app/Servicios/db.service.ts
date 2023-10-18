import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  isLoggedIn = false;
  session: any = {user: "Anonymous", token: "none"};

  constructor(private router:Router, private http: HttpClient) { }

  login(user: User) {
    let apiURL = 'http://localhost:8000/login'
    let httpOptions = {headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    observe: 'response' as 'response'
    };

    this.http.post(apiURL, user, httpOptions).subscribe((response) => {
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
