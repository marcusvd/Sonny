import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { UserProfileComponent } from '../user/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountGetInfoComponent } from '../user/components/account/account-get-info/account-get-info.component';
import { ContactGetInfoComponent } from '../user/components/contact-get-info/contact-get-info.component';
import { AddressGetEditComponent } from '../user/components/address-get-edit/address-get-edit.component';
import { AccountEditInfoComponent } from '../user/components/account/account-edit-info/account-edit-info.component';
import { ProfileEditService } from '../services/profile-edit.service';
import { AddressV2Service } from 'src/shared/components/address/services/address-v2.service';
import { ProfileLoadResolver } from '../resolve/profile-load.resolver';
import { ContactV2Service } from 'src/shared/components/contact/services/contact-v2.service';


@NgModule({
  declarations: [
    UserProfileComponent,
    AccountGetInfoComponent,
    AddressGetEditComponent,
    ContactGetInfoComponent,
    AccountEditInfoComponent
  ],
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
  exports: [
    UserProfileComponent,
    AccountGetInfoComponent,
    AddressGetEditComponent,
    ContactGetInfoComponent,
    AccountEditInfoComponent
  ],
  providers:[
    ProfileEditService,
    ProfileLoadResolver,
  ]
})
export class ProfilesModule { }
