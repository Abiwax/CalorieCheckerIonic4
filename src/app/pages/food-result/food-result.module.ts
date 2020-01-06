import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FoodResultPage } from './food-result';
import { FoodResultRouting } from './food-result-routing.module';
import {SkeletonModule} from "../../components/skeleton/skeleton.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodResultRouting,
    SkeletonModule
  ],
  declarations: [
    FoodResultPage
  ]
})
export class FoodResultPageModule { }

