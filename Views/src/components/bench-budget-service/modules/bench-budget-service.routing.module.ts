import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenchBudgetServiceDashComponent } from "../dash/dash.component";
import { TableProvidedServicesPricesComponent } from "../add/services-names-prices/table-provided-services-prices.component";
import { OpenBudgetComponent } from "../add/open-budget/open-budget.component";
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { BudgetResolver } from "../budget-list/resolver/budgets.resolver";
import { ServicesListComponent } from "../services-list/services-list.component";
import { ServicesResolver } from "../services-list/resolver/services.resolver";
import { OpenServicesResolver } from "../add/open-services/resolvers/open-services.resolver";
import { OpenServicesComponent } from "../add/open-services/open-services.component";
import { EditServicesComponent } from "../edit-services/edit-services.component";
import { EditServicesResolver } from "../edit-services/resolvers/edit-services.resolver";



const routes: Routes = [
  {
    path: '', component: BenchBudgetServiceDashComponent, children: [
      {
        path: 'list-budgets/:id', component: BudgetListComponent //, resolve: { loaded: BudgetResolver }
      },
      {
        path: 'list-services/:id', component: ServicesListComponent, resolve: { loaded: ServicesResolver }
      },
      {
        path: 'open-service/:id', component: EditServicesComponent, resolve: { loaded: OpenServicesResolver }
      },
      // {
      //   path: 'open-service/:id', component: OpenServicesComponent, resolve: { loaded: OpenServicesResolver }
      // },
      {
        path: 'edit-service/:id', component: EditServicesComponent, resolve: { loaded: EditServicesResolver }
      },
      {
        path: 'open-budget/:id', component: OpenBudgetComponent, //resolve: { loaded: CustomersLengthResolver }
      },
      {
        path: 'table-provided-services-prices', component: TableProvidedServicesPricesComponent
      },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BenchBudgetServiceRoutingModule {

}
