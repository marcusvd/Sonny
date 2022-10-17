import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { NavOrderServicesComponent } from 'src/components/services-provision/nav-order-services/nav-order-services.component'
import { OrderServicesRoutingModule } from "./order-services-routing.module";
import { ConfirmCrudService } from "src/shared/components/dialog-quiz/services/confirm_crud.service";
import { ServiceBudgetInfoEditComponent } from "../budget/service-budget-info-edit/service-budget-info-edit.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { OsEquipamentRemoveServicesService } from "../os-remove-equipament/services/os-equipament_remove-services.service";
import { ServicesBudgetInfoEditService } from "../budget/services/services-budget-info-edit.service";
import { ServicesBudgetCreateService } from "../budget/services/services-budget-create.service";
import { ServiceBenchCreateService } from "../bench/services/service-bench-create.service";
import { TabGModule } from "src/shared/components/tab-g/modules/tab-g.module";
import { ExpansionPanelGModule } from "src/shared/components/expansion-panel-g/module/expansion-panel-g.module";
import { PanelServicesBenchComponent } from "../bench/panel-services-bench/panel-services-bench.component";
import { ServicesBenchResolver } from "../bench/resolver/services-bench.resolver";
import { ServiceTechnicalBenchListService } from "../bench/services/service-technical-bench-list.service";



@NgModule({
  declarations: [
    CreateOsRemoveEquipament,
    NavOrderServicesComponent,
    ServiceBudgetInfoEditComponent,

  ],
  imports: [
    //angular imports
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    //my imports
    OrderServicesRoutingModule,
    TabGModule,
    ExpansionPanelGModule
  ],
  exports: [],
  providers: [
    ServicesBudgetCreateService,
    ConfirmCrudService,
    ServicesBudgetInfoEditService,
    OsEquipamentRemoveServicesService,
    // ServiceBenchListService,
    ServiceBenchCreateService,
    ServicesBenchResolver,
    ServiceTechnicalBenchListService,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class OrderServicesModule {

}
