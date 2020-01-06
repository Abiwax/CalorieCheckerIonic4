import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FoodRecipeResultPage} from './food-recipe-result';

const routes: Routes = [
  {
    path: '',
    component: FoodRecipeResultPage,
    children: [
      {
        path: 'details',
        loadChildren: () => import('../food/food.module').then(m => m.FoodPageModule)
      },
      {
        path: 'recipe',
        loadChildren: () => import('../recipe/recipe.module').then(m => m.RecipePageModule)
      },
      {
        path: '',
        redirectTo: '/food/details',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRecipeResultRouting {
}


