import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
})
export class VistaProfePage implements OnInit {

  constructor(private router: Router, private activatedRouter: ActivatedRoute) { }
  
  public user = {
    usuario: "",
    password: ""
  }

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
