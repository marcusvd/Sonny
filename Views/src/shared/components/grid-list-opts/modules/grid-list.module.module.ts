import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListOptsComponent } from '../grid-list-opts.component';
import { SharedModule } from 'src/shared/modules/shared.module';
import { MaterialModule } from 'src/shared/modules/material.module';



@NgModule({
  declarations: [
    GridListOptsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    GridListOptsComponent
  ]
})
export class GridListModuleModule { }
