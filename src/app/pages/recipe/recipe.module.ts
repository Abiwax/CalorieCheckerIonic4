import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecipePage } from './recipe';
import { RecipeRouting } from './recipe-routing.module';
import {SkeletonModule} from "../../components/skeleton/skeleton.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeRouting,
    SkeletonModule
  ],
  declarations: [
    RecipePage
  ]
})
export class RecipePageModule { }

