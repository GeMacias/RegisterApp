import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../Servicios/db.service';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private dbservice: DbService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("No esta iniciada la sesión")
    let session_str = localStorage.getItem("session");
    if (session_str) {
      this.dbservice.session = JSON.parse(session_str);
      this.dbservice.isLoggedIn = true;
      console.log(this.router.parseUrl('login'))
    }
    return true;
  }
  
}
