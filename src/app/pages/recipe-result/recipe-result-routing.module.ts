import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeResultPage} from './recipe-result';

const routes: Routes = [
  {
    path: '',
    component: RecipeResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeResultRouting { }


