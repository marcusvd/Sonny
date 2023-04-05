import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { UserProfileComponent } from '../user/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared.module';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    LayoutModule,

    //My
    SharedModule,
    ProfilesRoutingModule
  ],
  exports: [UserProfileComponent]
})
export class ProfilesModule { }
