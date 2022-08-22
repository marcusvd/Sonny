import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavOrderServicesComponent } from "../nav-order-services/nav-order-services.component";
import { ServiceBudgetCreateComponent } from "../service-budget/service-budget-create/component/service-budget-create.component";
import { ServiceBudgetListComponent } from "../service-budget/service-budget-list/service-budget-list.component";
import { DatasheetDetailsComponent } from "../service-bench/datasheet/component/datasheet-details.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver-create/componente/collect-deliver.component";
import { ServiceBenchComponent } from "../service-bench/bench/component/service-bench.component";






const routesOs: Routes = [
  {
    path: 'orders', component: NavOrderServicesComponent
  },
  { path: 'collect', component: CreateOsRemoveEquipament },


  { path: 'budgetnew', component: ServiceBudgetCreateComponent },
  { path: 'budgetlist', component: ServiceBudgetListComponent },
  {path: 'bench', component: ServiceBenchComponent},




  { path: 'benchservices', component: DatasheetDetailsComponent }


]


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class OrderServicesRoutingModule {

}
