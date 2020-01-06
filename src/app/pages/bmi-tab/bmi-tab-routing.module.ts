import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BmiTabPage } from './bmi-tab';

const routes: Routes = [
  {
    path: '',
    component: BmiTabPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('../bmi/bmi.module').then(m => m.BmiPageModule)
          }
        ]
      },
      {
        path: 'weight',
        children: [
          {
            path: '',
            loadChildren: () => import('../weight/weight.module').then(m => m.WeightPageModule)
          }
        ]
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/bmi/main',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BmiTabRouting { }


