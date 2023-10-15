import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DbService } from './Servicios/db.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'vista-profe',
    canActivate:[DbService],
    loadChildren: () => import('./vista-profe/vista-profe.module').then( m => m.VistaProfePageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'vista-alumno',
    canActivate:[DbService],
    loadChildren: () => import('./vista-alumno/vista-alumno.module').then( m => m.VistaAlumnoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pagerror/pagerror.module').then( m => m.PagerrorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
