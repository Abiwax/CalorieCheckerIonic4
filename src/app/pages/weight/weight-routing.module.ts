import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeightPage} from './weight';

const routes: Routes = [
  {
    path: '',
    component: WeightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRouting { }


