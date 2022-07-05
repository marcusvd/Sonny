import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavOrderServicesComponent } from 'src/app/_components/administrative/local/services/nav-order-services/nav-order-services.component'
import { OrderServicesRoutingModule } from "./order-services-routing.module";

import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { ServiceBudgetCreateComponent } from "../service-budget/service-budget-create/service-budget-create.component";
import { ServiceBudgetListComponent } from "../service-budget/service-budget-list/service-budget-list.component";
import { ServiceBenchComponent } from "../service-bench/service-bench.component";
import { ServicesBudgetListService} from "../service-budget/services/services-budget-list.service";
import { ServicesBudgetCreateService } from "../service-budget/services/services-budget-create.service";
import { ConfirmCrudService } from "src/app/_shared/components/confirm-modal/services/confirm_crud.service";
import { ConfirmModalComponent } from "src/app/_shared/components/confirm-modal/confirm-modal.component";
import { ServiceBudgetInfoEditComponent } from "../service-budget/service-budget-info-edit/service-budget-info-edit.component";
import { ServicesBudgetInfoEditService } from "../service-budget/services/services-budget-info-edit.service";
import { DatasheetDetailsComponent } from "src/app/_components/administrative/local/services/service-bench/datasheet/datasheet-details/datasheet-details.component";
import { DatasheetDetailsService } from "../service-bench/datasheet/services/datasheet-details.service";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { OsEquipamentRemoveServicesService } from "../os-remove-equipament/services/os-equipament_remove-services.service";

@NgModule({
  declarations: [
    CreateOsRemoveEquipament,
    NavOrderServicesComponent,
    ServiceBudgetCreateComponent,
    ServiceBudgetListComponent,
    ServiceBenchComponent,
    ServiceBudgetInfoEditComponent,
    DatasheetDetailsComponent,


  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    OrderServicesRoutingModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    ServicesBudgetCreateService,
    ServicesBudgetListService,
    ConfirmCrudService,
    ServicesBudgetInfoEditService,
    DatasheetDetailsService,
    OsEquipamentRemoveServicesService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class OrderServicesModule {

}
