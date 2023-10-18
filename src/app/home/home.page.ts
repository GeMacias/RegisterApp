import { Component,ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { IonAvatar,IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AutentificarService } from '../Servicios/autentificar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
  
  @ViewChild(IonModal) modal!: IonModal;

  private animation!:Animation;
  constructor(private auth:AutentificarService,private router:Router,private animationCtrl:AnimationController,private alertController: AlertController) {}
  public mensaje = ""

  user = {
    usuario: "",
    password: ""
  }

  playAvatar(){
    this.animation.play();
  }

  async login(){
    let error: string = '';

    if (!this.user.usuario){
      error = "Ingrese nombre de Usuario"
    }
    else if (!this.user.password){
      error="Ingrese Contraseña"
    }
    else{
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
      
      return
    }
    const alert = await this.alertController.create({
      header: 'Error al inicial sesión',
      message: error,
      buttons: ['OK'],
    });

    await alert.present();
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
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

}
