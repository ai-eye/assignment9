import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingDetailsContainerComponent } from './building-details/building-details-container/building-details-container.component';

const buildingRoutes: Routes = [
  {
    path: '',
    component: BuildingDetailsContainerComponent    
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(buildingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuildingRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/