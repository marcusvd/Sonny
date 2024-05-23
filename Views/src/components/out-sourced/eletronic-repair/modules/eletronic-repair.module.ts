import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';


import { GridListModule } from "src/shared/components/grid-list-opts/modules/grid-list.module.module";
import { SearchGModule } from "src/shared/components/search-g/modules/search-g.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";
import { EletronicRepairCreateService } from "../services/eletronic-repair.create.service";
import { EletronicRepairModuleRouting } from "./eletronic-repair.module.routing";

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
    // MatGridListModule,
    RouterModule,
    //My
    SharedModule,
    EletronicRepairModuleRouting,
    SearchGModule,

    //standAlone
    GridListModule

  ],
  exports: [

  ],
  providers: [
    EletronicRepairCreateService,
  ]

})

export class EletronicRepairModule {

}
