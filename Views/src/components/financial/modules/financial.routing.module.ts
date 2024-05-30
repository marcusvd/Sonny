import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExpensesToPayComponent } from "src/shared/components/financial/expenses-to-pay/expenses-to-pay.component";
import { FinancialResolver } from "src/shared/components/financial/resolvers/financial.resolver";
import { BankAccountCardsAddComponent } from "../components/bank-account-cards/add/bank-account-cards-add.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { FixedExpensesTrackingListComponent } from "../components/fixed-expenses-trancking/list/fixed-expenses-tracking-list.component";
import { FixedExpensesAddComponent } from "../components/fixed-expenses/components/add/fixed-expenses-add.component";
import { FixedExpensesListComponent } from "../components/fixed-expenses/components/list/fixed-expenses-list.component";




const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsAddComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },
      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },

      { path: 'fixed-expenses-tracking-list', component: FixedExpensesTrackingListComponent },

      { path: 'fixed-expenses-list', component: FixedExpensesListComponent },
      { path: 'fixed-expenses-add', component: FixedExpensesAddComponent },

      { path: 'fixed-expenses-to-pay/:id', component: ExpensesToPayComponent, resolve:{loaded: FinancialResolver} },


      // { path: 'essential-expenses-payment', component: EssentialExpensesCreateComponent },
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
