import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenchBudgetResolver } from "src/components/bench-budget-service/resolvers/bench-budget.resolver";


const routes: Routes = [


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollectDeliverCreateRoutingModule {

}
