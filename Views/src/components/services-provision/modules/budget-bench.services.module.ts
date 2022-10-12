import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { PanelServicesBudgetComponent } from "../budget/panel-services-budget/panel-services-budget.component";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/service-budget-list.component";
import { ServiceBenchListComponent } from "../bench/service-bench-list/service-bench-list.component";
import { PanelServicesBenchComponent } from "../bench/panel-services-bench/panel-services-bench.component";
import { BudgetBenchRoutingModule } from "./budget-bench.routing.module";
import { ServiceBenchCreateService } from "../budget/services/service-bench-create.service";



@NgModule({
  declarations: [
    ServiceBudgetListComponent,
    PanelServicesBudgetComponent,
    ServiceBudgetCreateComponent,
    //bench
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
    BudgetBenchRoutingModule
  ],
  exports: [

  ],
  providers: [ServiceBenchCreateService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BudgetBenchServicesModule {

}
