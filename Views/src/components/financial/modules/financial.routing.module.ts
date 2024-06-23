import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BankAccountCardsAddComponent } from "../components/bank-account-cards/add/bank-account-cards-add.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { MonthFixedExpensesTrackingListComponent } from "../components/month-fixed-expenses-trancking/list/month-fixed-expenses-tracking-list.component";
import { PayFixedBillsComponent } from "../components/month-fixed-expenses-trancking/pay-fixed-bills/pay-fixed-bills.component";
import { MonthFixedExpensesAddComponent } from "../components/month-fixed-expenses/components/add/month-fixed-expenses-add.component";
import { MonthFixedExpensesListComponent } from "../components/month-fixed-expenses/components/list/month-fixed-expenses-list.component";




const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsAddComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },
      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },

      { path: 'month-fixed-expenses-tracking-list', component: MonthFixedExpensesTrackingListComponent },

      { path: 'month-fixed-expenses-list', component: MonthFixedExpensesListComponent },
      { path: 'month-fixed-expenses-add', component: MonthFixedExpensesAddComponent },

      { path: 'month-fixed-expenses-to-pay/:id', component: PayFixedBillsComponent },
      // { path: 'fixed-expenses-to-pay/:id', component: ExpensesToPayComponent, resolve:{loaded: FinancialResolver} },


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
