import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavOrderServicesComponent } from "../nav-order-services/nav-order-services.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBenchBudgetListComponent } from "../bench/service-bench-budget-list/service-bench-budget-list.component";
import { ServiceBenchCreateService } from "../bench/services/service-bench-create.service";
import { ContactComponent } from "src/shared/components/contact/component/contact.component";
import { ServiceTechnicalBenchListComponent } from "../bench/service-technical-bench-list/service-technical-bench-list.component";


const routesOs: Routes = [
  {
    path: 'orders', component: NavOrderServicesComponent
  },
  { path: 'collect', component: CreateOsRemoveEquipament },
  { path: 'budgetnew', component: ServiceBudgetCreateComponent },
  { path: 'bench-budget', component: ServiceBenchBudgetListComponent },
  { path: 'technical-bench', component: ServiceTechnicalBenchListComponent},
  { path: 'benchservices', component: ServiceBenchCreateService }
]


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class OrderServicesRoutingModule {

}
