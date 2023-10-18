import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DbService } from '../Servicios/db.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, 
    private activatedRouter: ActivatedRoute,
    private dbService: DbService) { }

  public user = {
    usuario: "",
    password: ""
  }

  session=this.dbService.session



  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(()=> {
      let state= this.router.getCurrentNavigation()?.extras.state;
      if (state){
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }
}
