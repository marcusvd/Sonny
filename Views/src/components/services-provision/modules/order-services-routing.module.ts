import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavOrderServicesComponent } from "../nav-order-services/nav-order-services.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/components/container/service-budget-list.component";
import { ServiceBudgetCreateComponent } from "../budget/service-budget-create/component/service-budget-create.component";
import { ServiceBenchComponent } from "../bench/component/service-bench.component";
import { ServiceBenchCreateService } from "../services/bench/service-bench-create.service";
import { ContactComponent } from "src/shared/components/contact/component/contact.component";





const routesOs: Routes = [
  {
    path: 'orders', component: NavOrderServicesComponent
  },
  { path: 'collect', component: CreateOsRemoveEquipament },
  { path: 'budgetnew', component: ServiceBudgetCreateComponent },
  {
    path: 'budgetlist', component: ServiceBudgetListComponent, children: [
      { path: 'contacts', component: ContactComponent }
    ]
  },
  { path: 'bench', component: ServiceBenchComponent },
  { path: 'benchservices', component: ServiceBenchCreateService }


]


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class OrderServicesRoutingModule {

}
