import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SideNavComponent } from '../components/side-nav.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TreeGModule } from '../../tree-g/modules/tree-g.module';
import { TopBarComponent } from '../components/common-components/top-bar/top-bar.component';



@NgModule({
  declarations: [
    SideNavComponent,
    TopBarComponent
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
