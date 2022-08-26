import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/shared/modules/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavOrderServicesComponent } from 'src/components/services-provision/nav-order-services/nav-order-services.component'
import { OrderServicesRoutingModule } from "./order-services-routing.module";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/service-budget-list.component";
import { ConfirmCrudService } from "src/shared/components/confirm-modal/services/confirm_crud.service";
import { ServiceBudgetInfoEditComponent } from "../budget/service-budget-info-edit/service-budget-info-edit.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { OsEquipamentRemoveServicesService } from "../os-remove-equipament/services/os-equipament_remove-services.service";
import { ServiceBenchComponent } from "../bench/component/service-bench.component";
import { ServicesBudgetInfoEditService } from "../services/budget/services-budget-info-edit.service";
import { ServiceBenchListService } from "../services/bench/service-bench-list.service";
import { ServicesBudgetListService } from "../services/budget/services-budget-list.service";
import { ServicesBudgetCreateService } from "../services/budget/services-budget-create.service";
import { ServiceBenchCreateService } from "../services/bench/service-bench-create.service";



@NgModule({
  declarations: [
    CreateOsRemoveEquipament,
    NavOrderServicesComponent,
    ServiceBudgetCreateComponent,
    ServiceBudgetListComponent,
    ServiceBudgetInfoEditComponent,
    ServiceBenchComponent,
  ],
  imports: [
    // MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    OrderServicesRoutingModule,
    CommonModule,

    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ServiceBenchComponent,
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