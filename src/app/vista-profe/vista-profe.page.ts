import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
})
export class VistaProfePage implements OnInit {

  constructor(private router: Router, 
    private activatedRouter: ActivatedRoute,) { }
  
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
