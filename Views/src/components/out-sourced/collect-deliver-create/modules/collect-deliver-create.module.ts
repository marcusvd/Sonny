import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";
import { CollectDeliverCreateResolver } from "../resolver/collect-deliver.resolver";
import { ClientListService} from "src/components/client/client-list/services/client-list.service";
import { UnitService } from "src/components/unit/services/unit.service";
import { CollectDeliverCreateRoutingModule } from "./collect-deliver-create.routing.module";
import { CdkStepper } from "@angular/cdk/stepper";
import { TemplateTestComponent } from "../componente/template-test";


@NgModule({
  declarations:
    [
      CollectDeliverCreateComponent,
      TemplateTestComponent,
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
    ClientListService,
    UnitService,
    CdkStepper
  ]

})

export class CollectDeliverCreateModule {

}
