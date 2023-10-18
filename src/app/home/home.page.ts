import { Component,ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { IonAvatar,IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AutentificarService } from '../Servicios/autentificar.service';
import { User } from '../Servicios/user'; 
import { DbService } from '../Servicios/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
  
  @ViewChild(IonModal) modal!: IonModal;

  private animation!:Animation;
  constructor(
    private auth:AutentificarService,
    private router:Router,
    private animationCtrl:AnimationController,
    private alertController: AlertController,
    private dbService: DbService) {}
 
    public mensaje = ""

  user: User = {
    username: "",
    password: ""
  }

  playAvatar(){
    this.animation.play();
  }

  ingresarUsuario(user: User) {
    this.dbService.login(user)
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
    .addElement(this.avatar.nativeElement)
    .duration(5000)
    .iterations(Infinity)
    .keyframes([
      {offset:0,opacity:'1'},
      {offset:0.25,opacity:'0.5'},
      {offset:0.50,opacity:'0.1'},
      {offset:0.75,opacity:'0.5'},
      {offset:1,opacity:'1'},
    ])
  }

  
  mostrarConsola() {
    console.log(this.user);
    if (this.user.username != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }


}
