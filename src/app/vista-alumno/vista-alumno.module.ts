import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAlumnoPageRoutingModule } from './vista-alumno-routing.module';

import { VistaAlumnoPage } from './vista-alumno.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAlumnoPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [VistaAlumnoPage]
})
export class VistaAlumnoPageModule {}
