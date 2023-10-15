import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenchBudgetServiceDashComponent } from "../dash/dash.component";
import { TableProvidedServicesPricesComponent } from "../add/services-names-prices/table-provided-services-prices.component";
import { OpenBudgetComponent } from "../add/open-budget/open-budget.component";
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";
import { BenchBudgetResolver } from "../resolvers/bench-budget.resolver";
import { ListComponent } from "../add/services/list.component";
import { AddEditServicesComponent } from "../add/add-edit-services/add-edit-services.component";
import { AddEditServicesResolver } from "../add/add-edit-services/resolvers/add-edit-services.resolver";



const routes: Routes = [
  //   {
  //   path: 'services-provision-adm-dash', component: ServicesProvisionAdmDashComponent, children: [
  //     { path: 'budget-create', component: ServiceBudgetCreateComponent },
  //     { path: 'budget-list', component: ServiceBudgetListComponent },
  //     { path: 'bench-list', component: ServiceBenchBudgetListComponent },
  //     { path: 'technical-bench-list', component: ServiceTechnicalBenchListComponent }
  //   ]
  // },
  // {
  //   path: 'services-provision-tech-dash', component: ServicesProvisionTechDashComponent, children: [
  //     { path: 'bench-list', component: ServiceBenchBudgetListComponent },
  //     { path: 'technical-bench-list', component: ServiceTechnicalBenchListComponent }
  //   ]
  // }
  {
    path: '', component: BenchBudgetServiceDashComponent, children: [
      {
        path: 'list-services/:id', component: ListComponent, resolve: { loaded: BenchBudgetResolver }
      },
      {path: 'service/:id', component: AddEditServicesComponent, resolve: { loaded: AddEditServicesResolver }},

  // {
  //   path: 'list-services/:id', component: ListComponent, resolve: { loaded: BenchBudgetResolver }, children: [
  //     { path: 'service/:id', component: AddEditServicesComponent, resolve:{loaded: AddEditServicesResolver} }
  //   ]
  // },
  { path: 'table-provided-services-prices', component: TableProvidedServicesPricesComponent },
      { path: 'open-budget/:id', component: OpenBudgetComponent, resolve: { loaded: CustomersLengthResolver } },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BenchBudgetServiceRoutingModule {

}
