import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipePage} from './recipe';

const routes: Routes = [
  {
    path: '',
    component: RecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRouting {
}
