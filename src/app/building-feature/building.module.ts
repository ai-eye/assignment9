import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingDetailsComponent } from './building-details/building-details.component';

import { SharedModule } from '../shared/shared.module';
import { BuildingDetailsContainerComponent } from './building-details/building-details-container/building-details-container.component';
import { BuildingRoutingModule } from './building-router.module';

@NgModule({
  declarations: [BuildingDetailsComponent, BuildingDetailsContainerComponent],
  exports: [
    BuildingDetailsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BuildingRoutingModule,
  ]
})
export class BuildingModule { }
