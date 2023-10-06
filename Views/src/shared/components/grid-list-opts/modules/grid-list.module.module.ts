import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListOptsComponent } from '../grid-list-opts.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchGModule } from '../../search-g/modules/search-g.module';

import { GridListOptsSearchComponent } from '../grid-list-opts-search.component';
import { GridListOptsTitleComponent } from '../grid-list-opts-title.component';
import { TestsComponent } from 'src/tests/tests.component';
import { GridListOptsTableComponent } from '../grid-list-opts-table.component';

@NgModule({
  declarations: [
    GridListOptsComponent,
    GridListOptsTableComponent,
    GridListOptsSearchComponent,
    GridListOptsTitleComponent,
    TestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
      //Angular
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule,
      //My
      // SharedModule,
      SearchGModule
  ],
  exports:[
    GridListOptsComponent
  ]
})
export class GridListModule { }
