import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from './db.service';
import { AutentificarService } from './autentificar.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private dbservice: DbService,
    private router: Router,
    private auth: AutentificarService,
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.auth.autenticado) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}
