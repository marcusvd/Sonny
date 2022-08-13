import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";
import { MatGridListModule} from "@angular/material/grid-list";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";
import { CollectDeliverCreateModuleRouting } from "./collect-deliver-create.module.routing";
import { CollectDeliverCreateResolver } from "../resolver/collect-deliver.resolver";
import { ClientListService, CompanyService } from "src/components/client/client-list/services/client-list.service";


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
    CompanyService
  ]

})

export class CollectDeliverCreateModule {

}
