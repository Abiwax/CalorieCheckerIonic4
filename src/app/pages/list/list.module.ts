import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListPage } from './list';
import {ListRouting} from './list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRouting
  ],
  declarations: [
    ListPage
  ]
})
export class ListPageModule { }

