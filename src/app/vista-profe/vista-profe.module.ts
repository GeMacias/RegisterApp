import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaProfePageRoutingModule } from './vista-profe-routing.module';

import { VistaProfePage } from './vista-profe.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaProfePageRoutingModule,
    QRCodeModule,
  ],
  declarations: [VistaProfePage]
})
export class VistaProfePageModule {}
