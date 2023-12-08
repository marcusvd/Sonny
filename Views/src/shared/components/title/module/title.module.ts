import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title.component';
//import { TitleContainerComponent } from '../components/title-container.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TitleComponent,
    //TitleContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    TitleComponent,
    //TitleContainerComponent
  ],
  providers: [],
})
export class TitleModule { }
