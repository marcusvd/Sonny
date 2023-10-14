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
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";
import { OpenBudgetService } from "../add/open-budget/services/open-budget.service";
import { BenchBudgetResolver } from "../resolvers/bench-budget.resolver";
import { ListComponent } from "../add/services/list.component";
import { AddEditServicesComponent } from "../add/add-edit-services/add-edit-services.component";




@NgModule({
  declarations: [
    TableProvidedServicesPricesComponent,
    OpenBudgetComponent,
    BenchBudgetServiceDashComponent,
    CreateOsRemoveEquipament,
    ListComponent,
    AddEditServicesComponent
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
    TableProvidedServicesPricesService,
    CustomersLengthResolver,
    BenchBudgetResolver,
    OpenBudgetService
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BenchBudgetServiceModule {

}
