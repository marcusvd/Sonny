import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/shared/modules/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavOrderServicesComponent } from 'src/components/services-provision/nav-order-services/nav-order-services.component'
import { OrderServicesRoutingModule } from "./order-services-routing.module";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ConfirmCrudService } from "src/shared/components/confirm-modal/services/confirm_crud.service";
import { ServiceBudgetInfoEditComponent } from "../budget/service-budget-info-edit/service-budget-info-edit.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { OsEquipamentRemoveServicesService } from "../os-remove-equipament/services/os-equipament_remove-services.service";
import { ServiceBenchListComponent } from "../bench/service-bench-list/service-bench-list.component";
import { ServicesBudgetInfoEditService } from "../budget/services/services-budget-info-edit.service";
import { ServiceBenchListService } from "../bench/services/service-bench-list.service";
import { ServicesBudgetListService } from "../budget/service-budget-list/services/services-budget-list.service";
import { ServicesBudgetCreateService } from "../budget/services/services-budget-create.service";
import { ServiceBenchCreateService } from "../bench/services/service-bench-create.service";
import { TabGModule } from "src/shared/components/tab-g/modules/tab-g.module";
import { ExpansionPanelGModule } from "src/shared/components/expansion-panel-g/module/expansion-panel-g.module";
import { PanelServicesBenchComponent } from "../bench/panel-services-bench/panel-services-bench.component";





@NgModule({
  declarations: [
    CreateOsRemoveEquipament,
    NavOrderServicesComponent,
    ServiceBudgetCreateComponent,
    ServiceBudgetInfoEditComponent,
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
    OrderServicesRoutingModule,
    TabGModule,
    ExpansionPanelGModule
  ],
  exports: [
    ServiceBenchListComponent,
    PanelServicesBenchComponent,
    // ExpansionPanelModule
  ],
  providers: [
    ServicesBudgetCreateService,
    ServicesBudgetListService,
    ConfirmCrudService,
    ServicesBudgetInfoEditService,
    OsEquipamentRemoveServicesService,
    ServiceBenchListService,
    ServiceBenchCreateService

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class OrderServicesModule {

}
