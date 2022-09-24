import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatGridListModule} from "@angular/material/grid-list";

import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";
import { CollectDeliverCreateModuleRouting } from "./collect-deliver-create.module.routing";
import { CollectDeliverCreateResolver } from "../resolver/collect-deliver.resolver";
import { ClientListService} from "src/components/client/client-list/services/client-list.service";
import { UnitService } from "src/components/unit/services/unit.service";


@NgModule({
  declarations:
    [
      CollectDeliverCreateComponent
    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    RouterModule,
    //My
    CollectDeliverCreateModuleRouting,
    SharedModule,

  ],
  exports: [

  ],
  providers: [
    CollectDeliverCreateResolver,
    ClientListService,
    UnitService
  ]

})

export class CollectDeliverCreateModule {

}
