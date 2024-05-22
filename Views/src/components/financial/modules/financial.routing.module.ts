import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BankAccountCardsComponent } from "../components/bank-account-cards/add/bank-account-cards.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { FinancialExpensesComponent } from "../components/financial-expenses/components/add/financial-expenses.component";



const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },

      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },
      { path: 'essential-expenses-payment', component: EssentialExpensesCreateComponent },
      { path: 'expenses-base', component: FinancialExpensesComponent },
      { path: 'expenses-no-predictable-payment/:id', component: FinancialExpensesNotPredictableCreateComponent }//, resolve: { loaded: CustomersLengthResolver }},
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
