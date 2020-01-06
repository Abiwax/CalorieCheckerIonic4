import { NgModule } from '@angular/core';
import { Skeleton } from './skeleton';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    Skeleton,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    Skeleton
  ]
})
export class SkeletonModule {}
