import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { CollectDeliverCreateResolver } from "../resolver/collect-deliver.resolver";
import { UnitService } from "src/components/unit/services/unit.service";
import { CollectDeliverCreateRoutingModule } from "./collect-deliver-create.routing.module";
import { CdkStepper } from "@angular/cdk/stepper";
import { CollectDeliverOldComponent } from "../components/collect-deliver.component";
import { TableCollectDeliverModule } from "../components/table-collect-deliver/modules/table-collect-deliver.module";
import { ConfirmationPanelComponent } from "../components/confirmation-panel/confirmation-panel.component";
import { ConfirmationPanelModule } from "../components/confirmation-panel/modules/confirmation-panel.module";
import { CustomerListService } from "src/components/main/customer/components/services/customer-list.service";
import { OtherFormComponent } from "../components/other-form/other-form.component";
import { FormErrorPanelCollectDeliverComponent } from "../components/form-error-panel-collect-deliver/form-error-panel-collect-deliver.component";





@NgModule({
  declarations:
    [
      CollectDeliverOldComponent,
      OtherFormComponent,
      FormErrorPanelCollectDeliverComponent
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
    TableCollectDeliverModule,
    ConfirmationPanelModule

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
