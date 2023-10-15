import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagerrorPageRoutingModule } from './pagerror-routing.module';

import { PagerrorPage } from './pagerror.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagerrorPageRoutingModule
  ],
  declarations: [PagerrorPage]
})
export class PagerrorPageModule {}
