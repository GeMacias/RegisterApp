import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagerrorPage } from './pagerror.page';

const routes: Routes = [
  {
    path: '',
    component: PagerrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagerrorPageRoutingModule {}
