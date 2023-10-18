import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { User, UserRegister } from '../Servicios/user';
import { DbService } from '../Servicios/db.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  constructor(private router: Router,
     private activatedRouter: ActivatedRoute,
     private dbService: DbService) { }

  public alertButtons = ['OK'];
  
  public user = {
    usuario: "",
    password: ""
  }
  
  public informacion: UserRegister = {
    username: "",
    email: "",
    password: "",
    
  }

  registrarUsuario(userRegister: UserRegister) {
    this.dbService.register(userRegister)
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }

}
