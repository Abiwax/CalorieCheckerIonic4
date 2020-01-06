import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BmiTabPage } from './bmi-tab';
import { BmiTabRouting } from './bmi-tab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BmiTabRouting
  ],
  declarations: [
    BmiTabPage
  ]
})
export class BmiTabPageModule { }

