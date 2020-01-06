import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RecipeResultRouting} from './recipe-result-routing.module';
import {RecipeResultPage} from './recipe-result';
import {RatingModule} from "../../components/rating/rating.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeResultRouting,
    RatingModule
  ],
  declarations: [
    RecipeResultPage
  ]
})
export class RecipeResultModule { }

