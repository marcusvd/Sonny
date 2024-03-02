import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SideNavComponent } from '../components/side-nav.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TreeGModule } from '../../tree-g/modules/tree-g.module';
import { SideMenuSlimComponent } from '../components/common-components/side-menu-slim/side-menu-slim.component';
import { SideMenuLargeComponent } from 'src/shared/components/side-nav/components/common-components/side-menu-large/side-menu-large.component';
import { SideMenuTopLargeComponent } from '../components/common-components/side-menu-top-large/side-menu-top-large.component';
import { SideMenuTopSlimComponent } from '../components/common-components/side-menu-top-slim/side-menu-top-slim.component';



@NgModule({
  declarations: [
    SideNavComponent
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
    //standAloneComponents
    SideMenuSlimComponent,
    SideMenuLargeComponent,
    SideMenuTopLargeComponent,
    SideMenuTopSlimComponent
  ],
  exports: [
    SideNavComponent,
  ]
})
export class SideNavModule { }
