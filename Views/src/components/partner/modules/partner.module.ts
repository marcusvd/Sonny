import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { PartnerCreateComponent } from '../components/partner-create/partner-create.component';

import { PartnerListComponent } from '../components/partner-list/partner-list.component';
import { PartnerListListComponent } from '../components/partner-list-list/partner-list-list.component';
import { PartnerDetailsComponent } from '../components/partner-details/partner-details.component';
import { PartnerEditComponent } from 'src/components/partner/components/partner-edit/partner-edit.component';

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";


import { PartnerRoutingModule } from "./partner.module.routing";
import { MatGridListModule } from "@angular/material/grid-list";
import { NavPartnerComponent } from "../components/nav-partner/nav-partner.component";
import { PartnerListService } from "../services/partner-list.service";
import { CollectDeliverCreateService } from "../../out-sourced/collect-deliver-create/services/collect-deliver-create.service";
import { EletronicRepairCreateService } from "../../out-sourced/eletronic-repair/services/eletronic-repair.create.service";
import { PartnerEditResolver } from "src/components/out-sourced/resolvers/partner.edit.resolver";




@NgModule({
  declarations:
    [
      PartnerListComponent,
      PartnerCreateComponent,
      PartnerDetailsComponent,
      PartnerEditComponent,
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

  ]

})

export class PartnerModule {

}
