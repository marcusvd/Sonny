import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { PartnerCreateComponent } from 'src/app/_components/administrative/local/out-sourced/partner-create/partner-create.component';

import { PartnerListComponent } from 'src/app/_components/administrative/local/out-sourced/partner-list/partner-list.component';
import { PartnerListListComponent } from 'src/app/_components/administrative/local/out-sourced/partner-list-list/partner-list-list.component';
import { PartnerDetailsComponent } from 'src/app/_components/administrative/local/out-sourced/partner-details/partner-details.component';
import { PartnerEditComponent } from 'src/app/_components/administrative/local/out-sourced/partner-edit/partner-edit.component';

import { MaterialModule } from "src/app/_shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { PartnerEditResolver } from "src/app/_components/administrative/local/out-sourced/resolvers/partner.edit.resolver";

import { PartnerRoutingModule } from "./partner.module.routing";
import { MatGridListModule } from "@angular/material/grid-list";
import { NavPartnerComponent } from "../nav-partner/nav-partner.component";
import { PartnerListService } from "./partner-list.service";
import { CollectDeliverCreateService } from "../collect-deliver-create/services/collect-deliver-create.service";
import { EletronicRepairCreateService } from "../eletronic-repair/services/eletronic-repair.create.service";





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
    FormsModule,
    MatGridListModule,
    //My
    MaterialModule,
    SharedModule,
    RouterModule,
    PartnerRoutingModule,
  ],
  exports: [
    PartnerCreateComponent,

  ],
  providers: [
    PartnerListService,
    PartnerEditResolver,
    CollectDeliverCreateService,
    // CollectDeliverResolver,
    EletronicRepairCreateService,
    // CollectDeliverListService,

    // CompanyService,

  ]

})

export class PartnerModule {

}
