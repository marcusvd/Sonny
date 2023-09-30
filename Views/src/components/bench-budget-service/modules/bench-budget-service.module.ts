import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module"; import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { BenchBudgetServiceRoutingModule } from "./bench-budget-service.routing.module";
import { TableProvidedServicesPricesComponent } from "../add/services-names-prices/table-provided-services-prices.component";
import { BenchBudgetServiceDashComponent } from "../dash/dash.component";
import { TableProvidedServicesPricesService } from "../add/services-names-prices/services/table-provided-services-prices.service";
import { OpenBudgetComponent } from "../add/open-budget/open-budget.component";


@NgModule({
  declarations: [
    TableProvidedServicesPricesComponent,
    OpenBudgetComponent,
    BenchBudgetServiceDashComponent,
    CreateOsRemoveEquipament
  ],
  imports: [
    //angular imports
    ReactiveFormsModule,

    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    BenchBudgetServiceRoutingModule
  ],
  exports: [

  ],
  providers: [
    TableProvidedServicesPricesService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BenchBudgetServiceModule {

}
