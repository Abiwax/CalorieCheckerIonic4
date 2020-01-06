import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeightPage } from './weight';
import {WeightRouting} from './weight-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightRouting
  ],
  declarations: [
    WeightPage
  ]
})
export class WeightPageModule { }


