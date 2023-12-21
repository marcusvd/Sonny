import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { SharedModule } from "src/shared/modules/shared.module";
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";
import { OpenBudgetComponent } from "../add/open-budget/open-budget.component";
import { OpenBudgetService } from "../add/open-budget/services/open-budget.service";
import { OpenServicesComponent } from "../add/open-services/open-services.component";
import { TableProvidedServicesPricesService } from "../add/services-names-prices/services/table-provided-services-prices.service";
import { TableProvidedServicesPricesComponent } from "../add/services-names-prices/table-provided-services-prices.component";
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { BudgetResolver } from "../budget-list/resolver/budgets.resolver";
import { CostsMovingComponent } from "../commons-components/costs-moving.component";
import { ExecutionModeAccessComponent } from "../commons-components/execution-mode-access.component";
import { ServicesRepairsComponent } from "../commons-components/services-repairs.component";
import { CommonFormService } from "../commons-components/services/common-form.service";
import { BenchBudgetServiceDashComponent } from "../dash/dash.component";
import { EditServicesComponent } from "../edit-services/edit-services.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { ServicesResolver } from "../services-list/resolver/services.resolver";
import { ServicesListComponent } from "../services-list/services-list.component";
import { BenchBudgetServiceRoutingModule } from "./bench-budget-service.routing.module";
import { HardwareIncludedComponent } from "../commons-components/hardware-included.component";

@NgModule({
  declarations: [
    TableProvidedServicesPricesComponent,
    OpenBudgetComponent,
    BenchBudgetServiceDashComponent,
    CreateOsRemoveEquipament,
    BudgetListComponent,
    ServicesListComponent,
    OpenServicesComponent,
    EditServicesComponent,
    CostsMovingComponent,
    ExecutionModeAccessComponent,
    ServicesRepairsComponent,
    HardwareIncludedComponent
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
    ServicesResolver,
    OpenBudgetService,
    BudgetResolver,
    CommonFormService
  ],
})

export class BenchBudgetServiceModule {

}
