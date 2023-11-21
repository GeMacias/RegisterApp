import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, 
    private activatedRouter: ActivatedRoute,) { }

  public alertButtons = ['OK'];
  public user = {
    username: "",
    password: ""
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.username = state['user'].username;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }
}
