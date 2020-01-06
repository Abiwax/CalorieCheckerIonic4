import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ReciperesultPage} from './reciperesult';

const routes: Routes = [
  {
    path: '',
    component: ReciperesultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciperesultRouting { }


