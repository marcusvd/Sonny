import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";
import { CollectDeliverCreateResolver } from "../resolver/collect-deliver.resolver";
import { UnitService } from "src/components/unit/services/unit.service";
import { CollectDeliverCreateRoutingModule } from "./collect-deliver-create.routing.module";
import { CdkStepper } from "@angular/cdk/stepper";
import { CustomerListService } from "src/components/customer/components/services/customer-list.service";
import { RadioButtonGComponent } from "src/shared/components/radio-button-g/component/radio-button-g.component";



@NgModule({
  declarations:
    [
      CollectDeliverCreateComponent,
    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    //My
    CollectDeliverCreateRoutingModule,
    SharedModule,

  ],
  exports: [

  ],
  providers: [
    CollectDeliverCreateResolver,
    CustomerListService,
    UnitService,
    CdkStepper,
    // RadioButtonGComponent
  ]

})

export class CollectDeliverCreateModule {

}
