import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  public mensaje = ""

  user = {
    correo: "",
    password: ""
  }
  
  mostrarConsola() {
    console.log(this.user);
    if (this.user.correo != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }
}
