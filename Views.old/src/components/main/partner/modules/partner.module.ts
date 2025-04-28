import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';


// import { PartnerListComponent } from '../components/partner-list/partner-list.component';
// import { PartnerListListComponent } from '../components/partner-list-list/partner-list-list.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";


import { PartnerEditResolver } from "src/components/out-sourced/resolvers/partner.edit.resolver";
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { PartnerListService } from "../list/services/partner-list.service";
import { PartnerRoutingModule } from "./partner.module.routing";
// import { PaymentDataComponent } from "../commons-components/info-bank/payment-data.component";
// import { BusinessLineComponent } from "../commons-components/business-line/business-line.component";
//import { ToolTips } from "src/shared/services/messages/snack-bar.service";




@NgModule({
  declarations:
    [
      // PartnerListComponent,
      // PartnerListListComponent,
      // PartnerCreateComponent,
      PartnerDashComponent,
      // PaymentDataComponent,
      // BusinessLineComponent

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
    AddressService,
    ContactService,
    // GetTotalEntitiesResolver
  ]

})

export class PartnerModule {

}
