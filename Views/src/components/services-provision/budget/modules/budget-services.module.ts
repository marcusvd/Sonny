import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { ServiceBudgetListComponent } from "../service-budget-list/service-budget-list.component";
import { PanelServicesBudgetComponent } from "../panel-services-budget/panel-services-budget.component";
import { ServiceBudgetCreateComponent } from "../service-budget-create/component/service-budget-create.component";
import { BudgetRoutingModule } from "./budget-routing.module";



@NgModule({
  declarations: [
    ServiceBudgetListComponent,
    PanelServicesBudgetComponent,
    ServiceBudgetCreateComponent
  ],
  imports: [
    //angular imports
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    BudgetRoutingModule
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BudgetServicesModule {

}
