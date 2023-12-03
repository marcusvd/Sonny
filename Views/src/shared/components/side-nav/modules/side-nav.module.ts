import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from '../components/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SideNavRoutingModule } from './side-nav.routing.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { TreeGModule } from '../../tree-g/modules/tree-g.module';



@NgModule({
  declarations: [
    SideNavComponent,
  ],
  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
   // SideNavRoutingModule,
    //MY IMPORTS
    MaterialModule,
    TreeGModule
  ],
  exports: [
    SideNavComponent,
  ]
})
export class SideNavModule { }
