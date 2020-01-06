import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivityPage } from './activity';
import { ActivityRouting } from './activity-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityRouting
  ],
  declarations: [
    ActivityPage
  ]
})
export class ActivityPageModule { }
