import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FoodRecipeResultPage } from './food-recipe-result';
import { FoodRecipeResultRouting } from './food-recipe-result-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodRecipeResultRouting
  ],
  declarations: [
    FoodRecipeResultPage
  ]
})
export class FoodRecipeResultPageModule { }

