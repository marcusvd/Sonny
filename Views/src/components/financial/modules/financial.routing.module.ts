import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { BankAccountComponent } from "../components/bank-account/component/bank-account.component";
import { FinancialExpensesComponent } from "../components/financial-expenses/components/add/financial-expenses.component";
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";


const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'bank-accounts', component: BankAccountComponent },
      { path: 'essential-expenses-payment', component: EssentialExpensesCreateComponent },
      { path: 'expenses-base', component: FinancialExpensesComponent },
      { path: 'expenses-no-predictable-payment/:id', component: FinancialExpensesNotPredictableCreateComponent , resolve: { loaded: CustomersLengthResolver }},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
  providers: []
})


export class FinancialRoutingModule {

}
