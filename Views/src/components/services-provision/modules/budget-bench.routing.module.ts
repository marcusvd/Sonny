import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceBudgetListComponent } from "../budget/service-budget-list/service-budget-list.component";

const routes: Routes = [{
  path: 'budgetlist', component:ServiceBudgetListComponent
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BudgetBenchRoutingModule {

}
