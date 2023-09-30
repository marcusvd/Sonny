import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenchBudgetServiceDashComponent } from "../dash/dash.component";
import { TableProvidedServicesPricesComponent } from "../add/services-names-prices/table-provided-services-prices.component";
import { OpenBudgetComponent } from "../add/open-budget/open-budget.component";



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
      { path: 'table-provided-services-prices', component: TableProvidedServicesPricesComponent },
      { path: 'open-budget', component: OpenBudgetComponent },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BenchBudgetServiceRoutingModule {

}
