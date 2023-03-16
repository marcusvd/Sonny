import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PaginatorComponent } from '../components/paginator.component';
import { PaginatorContainerComponent } from '../components/paginator-container.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    PaginatorContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    PaginatorComponent,
    PaginatorContainerComponent,
  ],
  providers: [],
})
export class PaginatorModule { }
