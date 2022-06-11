import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";

import { RegisterItemCreateComponent } from "../items-services/register-item-create/register-item-create.component";
import { NavOrderServicesComponent } from "../nav-order-services/nav-order-services.component";
import { CreateCollectEquipament } from "../collect-of-service/create-collect-equipament/create-collect-equipament.component";
import { ServiceBenchComponent } from "../service-bench/service-bench.component";
import { ServiceBudgetCreateComponent } from "../service-budget/service-budget-create/service-budget-create.component";
import { ServiceBudgetListComponent } from "../service-budget/service-budget-list/service-budget-list.component";
import { DatasheetDetailsComponent } from "../service-bench/datasheet/datasheet-details/datasheet-details.component";



const routesOs: Routes = [
  {
    path: 'orders', component: NavOrderServicesComponent, children: [
      {path: 'collect', component: CreateCollectEquipament },
      {path: 'item', component: RegisterItemCreateComponent },
      {path: 'budget', component: ServiceBudgetCreateComponent },
      {path: 'budgetlist', component: ServiceBudgetListComponent },
      {path: 'bench', component: ServiceBenchComponent },
      {path: 'benchservices', component: DatasheetDetailsComponent }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class OrderServicesRoutingModule {

}
