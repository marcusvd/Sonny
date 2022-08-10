import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";
import { MatGridListModule} from "@angular/material/grid-list";

import {  CollectDeliverListTableAllModuleRouting } from "./collect-deliver-list-table-all.module.routing";
import { CollectDeliverListTableAllComponent } from "../component/collect-deliver-dash-all.component";
import { CollectDeliverAllListTableService } from "../services/collect-deliver-all-list-table.service";

@NgModule({
  declarations:
    [
      CollectDeliverListTableAllComponent
    ],
  imports: [
    //ANGULAR
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    RouterModule,
    //My IMPORTS
    SharedModule,
    CollectDeliverListTableAllModuleRouting
  ],
  exports: [

  ],
  providers: [

    CollectDeliverAllListTableService
  ]

})

export class CollectDeliverListTableAllModule {

}
