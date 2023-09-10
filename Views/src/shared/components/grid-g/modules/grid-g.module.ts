import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridGComponent } from '../grid-g.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridGItemsComponent } from '../grid-g-items.component';
import { GridGHeaderComponent } from '../grid-g-header.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SearchGModule } from '../../search-g/modules/search-g.module';



@NgModule({
  declarations: [
    GridGComponent,
    GridGItemsComponent,
    GridGHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SearchGModule,
  ],
  exports:[
    GridGComponent,
    GridGItemsComponent,
    GridGHeaderComponent
  ]
})
export class GridGModule { }
