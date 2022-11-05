import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { PanelServicesBudgetComponent } from "../budget/panel-services-budget/panel-services-budget.component";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/service-budget-list.component";
import { ServiceBenchBudgetListComponent } from "../bench/service-bench-budget-list/service-bench-budget-list.component";
import { BudgetBenchRoutingModule } from "./budget-bench.routing.module";
import { ServiceBenchCreateService } from "../budget/services/service-bench-create.service";
import { ServiceTechnicalBenchListComponent } from "../bench/service-technical-bench-list/service-technical-bench-list.component";
import { ServiceTechnicalBenchPanelComponent } from "../bench/service-technical-bench-panel/service-technical-bench-panel.component";



@NgModule({
  declarations: [
    ServiceBudgetListComponent,
    PanelServicesBudgetComponent,
    ServiceBudgetCreateComponent,
    //bench
    ServiceBenchBudgetListComponent,
    ServiceTechnicalBenchListComponent,
    ServiceTechnicalBenchPanelComponent
  ],
  imports: [
    //angular imports
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    BudgetBenchRoutingModule
  ],
  exports: [

  ],
  providers: [ServiceBenchCreateService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BudgetBenchServicesModule {

}