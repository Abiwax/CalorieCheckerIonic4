import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FoodPage } from './food';
import { FoodRouting } from './food-routing.module';
import {SkeletonModule} from "../../components/skeleton/skeleton.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodRouting,
    SkeletonModule
  ],
  declarations: [
    FoodPage
  ]
})
export class FoodPageModule { }
