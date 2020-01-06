import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {TimelineComponent, TimelineItemComponent, TimelineTimeComponent} from './timeline';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
  ]
})
export class TimelineModule {}
