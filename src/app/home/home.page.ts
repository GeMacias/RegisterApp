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
  constructor(
    private auth:AutentificarService,
    private router:Router,
    private animationCtrl:AnimationController,
    private alertController: AlertController,) {}
 
    public mensaje = ""
    public estado: String = "";

    public user = {
      username: "",
      password: "",
      rol:""
    }

    

  playAvatar(){
    this.animation.play();
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

  enviarInformacion() {
    this.auth.login(this.user.username, this.user.password, this.user.rol).then(() => {
      if (this.auth.autenticado) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/login'], navigationExtras);
      } else {
        this.mensaje = "Debe ingresar sus credenciales";
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.auth.register(this.user.username, this.user.password).then((res) => {
      if (res) {
        this.estado = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.modal.dismiss(this.user.username, 'confirm');
      }
    })
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
