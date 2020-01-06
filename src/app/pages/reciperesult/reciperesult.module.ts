import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ReciperesultRouting} from './reciperesult-routing.module';
import {ReciperesultPage} from './reciperesult';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReciperesultRouting
  ],
  declarations: [
    ReciperesultPage
  ]
})
export class ReciperesultModule { }
