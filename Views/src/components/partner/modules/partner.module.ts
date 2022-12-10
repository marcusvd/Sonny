import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { PartnerCreateComponent } from '../components/partner-create/component/partner-create.component';

import { PartnerListComponent } from '../components/partner-list/partner-list.component';
import { PartnerListListComponent } from '../components/partner-list-list/partner-list-list.component';

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";


import { PartnerRoutingModule } from "./partner.module.routing";
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { NavPartnerComponent } from "../components/nav-partner/nav-partner.component";
import { PartnerListService } from "../services/partner-list.service";
import { EletronicRepairCreateService } from "../../out-sourced/eletronic-repair/services/eletronic-repair.create.service";
import { PartnerEditResolver } from "src/components/out-sourced/resolvers/partner.edit.resolver";
import { CollectDeliverCreateService } from "src/components/out-sourced/collect-deliver/collect-deliver-create/services/collect-deliver-create.service";
//import { ToolTips } from "src/shared/services/messages/snack-bar.service";




@NgModule({
  declarations:
    [
      PartnerListComponent,
      PartnerCreateComponent,
      NavPartnerComponent,
      PartnerListListComponent,

    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,

    //My
    SharedModule,


    PartnerRoutingModule,
  ],
  exports: [


  ],
  providers: [
    PartnerListService,
    PartnerEditResolver,
    CollectDeliverCreateService,
    EletronicRepairCreateService,
    AddressService,
    ContactService,
    //ToolTips
  ]

})

export class PartnerModule {

}
