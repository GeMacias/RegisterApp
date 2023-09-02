import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}
  public mensaje = ""

  user = {
    username: "",
    password: ""
  }

  enviarInformacion() {
    if (this.user.username != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/registrarse'], navigationExtras);
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
  }

  mostrarConsola() {
    console.log(this.user);
    
  }
}
