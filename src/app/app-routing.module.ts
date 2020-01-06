import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/food-recipe-result/food-recipe-result.module').then(m => m.FoodRecipeResultPageModule)
  },
  {
    path: 'food-result',
    loadChildren: () => import('./pages/food-result/food-result.module').then(m => m.FoodResultPageModule)
  },
  {
    path: 'recipe-result',
    loadChildren: () => import('./pages/recipe-result/recipe-result.module').then(m => m.RecipeResultModule)
  },
  {
    path: 'recipes-result',
    loadChildren: () => import('./pages/reciperesult/reciperesult.module').then(m => m.ReciperesultModule)
  },
  {
    path: 'bmi',
    loadChildren: () => import('./pages/bmi-tab/bmi-tab.module').then(m => m.BmiTabPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
