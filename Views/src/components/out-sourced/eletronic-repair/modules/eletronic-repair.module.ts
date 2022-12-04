import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";
import { MatGridListModule} from "@angular/material/grid-list";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";
import { EletronicRepairCreateService } from "../services/eletronic-repair.create.service";
import { EletronicRepairModuleRouting } from "./eletronic-repair.module.routing";
import { EletronicRepairCreateResolver } from "../../resolvers/eletronic-repair.resolver";

@NgModule({
  declarations:
    [
      EletronicRepairComponent
    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    RouterModule,
    //My
    SharedModule,
    EletronicRepairModuleRouting

  ],
  exports: [

  ],
  providers: [
    EletronicRepairCreateService,
    EletronicRepairCreateResolver

  ]

})

export class EletronicRepairModule {

}
