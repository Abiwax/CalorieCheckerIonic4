import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BmiPage } from './bmi';
import { BmiRouting } from './bmi-routing.module';
import {TimelineModule} from "../../components/timeline/timeline.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BmiRouting,
    TimelineModule
  ],
  declarations: [
    BmiPage
  ]
})
export class BmiPageModule { }

