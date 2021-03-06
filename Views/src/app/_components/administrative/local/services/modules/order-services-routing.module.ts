import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";


import { NavOrderServicesComponent } from "../nav-order-services/nav-order-services.component";

import { ServiceBenchComponent } from "../service-bench/service-bench.component";
import { ServiceBudgetCreateComponent } from "../service-budget/service-budget-create/service-budget-create.component";
import { ServiceBudgetListComponent } from "../service-budget/service-budget-list/service-budget-list.component";
import { DatasheetDetailsComponent } from "../service-bench/datasheet/datasheet-details/datasheet-details.component";
import { CreateOsRemoveEquipament } from "../os-remove-equipament/create/create-os-remove-equipament.component";



const routesOs: Routes = [
  {
    path: 'orders', component: NavOrderServicesComponent},
      {path: 'collect', component: CreateOsRemoveEquipament },

      {path: 'budgetnew', component: ServiceBudgetCreateComponent },
      {path: 'budgetlist', component: ServiceBudgetListComponent },
      {path: 'bench', component: ServiceBenchComponent },
      {path: 'benchservices', component: DatasheetDetailsComponent }


]


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class OrderServicesRoutingModule {

}
