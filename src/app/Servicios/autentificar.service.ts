import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Route} from '@angular/router';

interface User{
  username:string;
  password:string;
}


@Injectable({
  providedIn: 'root'
})
export class AutentificarService {
  public activo!:Boolean;
  private local!:Storage;

  constructor(private storage:Storage) {
    this.iniciar();
   }

   async iniciar(){
    const global = await this.storage.create();
    this.local = global;
   }

   async register(username:string, password:string):Promise<Boolean>{
    const users = await this.local.get('users') || [];
    const user = users.find((us:User) => us.username===username)
    if(user){
      console.log("usuario existente");
      return true;
    }else{
      const nuevo:User = {username,password};
      user.push(nuevo);
      await this.local.set('user',users)
      console.log("Registro Existoso");
      return false;
    }

   }

   async login(username:string,password:string):Promise<Boolean>{
    const users = await this.local.get('users') || [];
    const user = users.find((us:User)=> us.username===username && us.password===password)
    if(user){
      this.activo=true
      return true;
    }else{
      this.activo=false
      return false;
    }
   }

   logout(){
    this.activo=false;
   }

}
