import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceBenchBudgetListComponent } from "../bench/service-bench-budget-list/service-bench-budget-list.component";
import { ServiceTechnicalBenchListComponent } from "../bench/service-technical-bench-list/service-technical-bench-list.component";
import { ServicesProvisionTechDashComponent } from "../bench/services-provision-tech-dash/services-provision-tech-dash.component";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/service-budget-list.component";
import { ServicesProvisionAdmDashComponent } from "../services-provision-adm-dash/services-provision-adm-dash.component";


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
  path: '', component: ServicesProvisionAdmDashComponent, children: [
    { path: 'budget-create', component: ServiceBudgetCreateComponent },
    { path: 'budget-list', component: ServiceBudgetListComponent },

  ]
},
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BudgetRoutingModule {

}
