import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from "src/shared/modules/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavOrderServicesComponent } from 'src/components/services-provision/nav-order-services/nav-order-services.component'
import { OrderServicesRoutingModule } from "./order-services-routing.module";


import { ServiceBudgetCreateComponent } from "../service-budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../service-budget/service-budget-list/service-budget-list.component";
import { ServicesBudgetListService} from "../service-budget/services/services-budget-list.service";
import { ServicesBudgetCreateService } from "../service-budget/services/services-budget-create.service";
import { ConfirmCrudService } from "src/shared/components/confirm-modal/services/confirm_crud.service";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";
import { ServiceBudgetInfoEditComponent } from "../service-budget/service-budget-info-edit/service-budget-info-edit.component";
import { ServicesBudgetInfoEditService } from "../service-budget/services/services-budget-info-edit.service";
import { DatasheetDetailsComponent } from "src/components/services-provision/service-bench/datasheet/component/datasheet-details.component";
import { DatasheetDetailsService } from "../service-bench/datasheet/services/datasheet-details.service";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { OsEquipamentRemoveServicesService } from "../os-remove-equipament/services/os-equipament_remove-services.service";
import { ServiceBenchComponent } from "../service-bench/bench/component/service-bench.component";
import { ServiceBenchListService } from "../service-bench/bench/services/service-bench-list.service";


import { RouterModule } from "@angular/router";
import { ExpansionPanelBenchComponent } from "../service-bench/expansion-panel-bench/component/expansion-panel-bench.component";
import { TabBenchComponent } from "../service-bench/tab-bench/component/tab-bench.component";



@NgModule({
  declarations: [
    CreateOsRemoveEquipament,
    NavOrderServicesComponent,
    ServiceBudgetCreateComponent,
    ServiceBudgetListComponent,
    ServiceBudgetInfoEditComponent,
    DatasheetDetailsComponent,
    ExpansionPanelBenchComponent,
    ServiceBenchComponent,
    TabBenchComponent



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

    // BrowserModule
  ],
  exports: [
    ExpansionPanelBenchComponent,
    ServiceBenchComponent,
  ],
  providers: [
    ServicesBudgetCreateService,
    ServicesBudgetListService,
    ConfirmCrudService,
    ServicesBudgetInfoEditService,
    DatasheetDetailsService,
    OsEquipamentRemoveServicesService,
    ServiceBenchListService,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class OrderServicesModule {

}
