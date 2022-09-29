import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { TabGModule } from "src/shared/components/tab-g/modules/tab-g.module";
import { ExpansionPanelGModule } from "src/shared/components/expansion-panel-g/module/expansion-panel-g.module";
import { ServiceBenchListComponent } from "../service-bench-list/service-bench-list.component";
import { PanelServicesBenchComponent } from "../panel-services-bench/panel-services-bench.component";
import { ServiceBenchCreateService } from "../services/service-bench-create.service";
import { BenchRoutingModule } from "./bench-routing.module";



@NgModule({
  declarations: [
    ServiceBenchListComponent,
    PanelServicesBenchComponent,
  ],
  imports: [
    //angular imports
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    //my imports
    TabGModule,
    ExpansionPanelGModule,
    BenchRoutingModule
  ],
  exports: [
    ServiceBenchListComponent,
    PanelServicesBenchComponent,
    // ExpansionPanelModule
  ],
  providers: [
    ServiceBenchCreateService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BenchServicesModule {

}
