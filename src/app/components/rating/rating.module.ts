import { NgModule } from '@angular/core';
import { RatingComponent } from './rating';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    RatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingModule {}
