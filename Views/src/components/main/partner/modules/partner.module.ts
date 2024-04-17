import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";


// import { PartnerListComponent } from '../components/partner-list/partner-list.component';
// import { PartnerListListComponent } from '../components/partner-list-list/partner-list-list.component';

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";


import { PartnerRoutingModule } from "./partner.module.routing";
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { PartnerListService } from "../services/partner-list.service";
import { PartnerEditResolver } from "src/components/out-sourced/resolvers/partner.edit.resolver";
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { EletronicRepairCreateService } from "src/components/out-sourced/eletronic-repair/services/eletronic-repair.create.service";
import { PartnerCreateComponent } from "../add/partner-create.component";
// import { PaymentDataComponent } from "../commons-components/info-bank/payment-data.component";
import { BusinessLineComponent } from "../commons-components/business-line/business-line.component";
import { CollectDeliverCreateService } from "src/components/out-sourced/collect-deliver-old/collect-deliver-create/services/collect-deliver-create.service";
//import { ToolTips } from "src/shared/services/messages/snack-bar.service";




@NgModule({
  declarations:
    [
      // PartnerListComponent,
      // PartnerListListComponent,
      // PartnerCreateComponent,
      PartnerDashComponent,
      // PaymentDataComponent,
      BusinessLineComponent

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
