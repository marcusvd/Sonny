import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaymentComponent } from "src/shared/components/financial/payment/payment.component";
import { BankAccountCardsAddComponent } from "../components/bank-account-cards/add/bank-account-cards-add.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { EditCategorySubcategoryExpensesComponent } from "../components/common-components/category-subcategory-expenses/edit/edit-category-subcategory-expenses.component";
import { SelectExpensesComponent } from "../components/common-components/select-expenses/components/select/select-expenses.component";
import { AddCreditCardExpensesComponent } from "../components/credit-card-fixed-expenses/components/add/add-credit-card-expenses.component";
import { ListCreditCardExpensesComponent } from "../components/credit-card-fixed-expenses/components/list/list-credit-card-expenses.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { AddFinancingsLoansExpensesComponent } from "../components/financings-loans-expenses/components/add/add-financings-loans-expenses.component";
import { MonthlyFixedExpensesAddComponent } from "../components/monthly-fixed-expenses/components/add/monthly-fixed-expenses-add.component";
import { ListMonthlyFixedExpensesComponent } from "../components/monthly-fixed-expenses/components/list/list-monthly-fixed-expenses.component";
import { ViewMonthlyFixedExpensesComponent } from "../components/monthly-fixed-expenses/components/view/view-monthly-fixed-expenses.component";
import { VariableExpensesAddComponent } from "../components/variable-expenses/components/add/variable-expenses-add.component";
import { YearlyFixedExpensesAddComponent } from "../components/yearly-fixed-expenses/components/add/yearly-fixed-expenses-add.component";
import { ListYearlyFixedExpensesComponent } from "../components/yearly-fixed-expenses/components/list/list-yearly-fixed-expenses.component";
import { PaymentMonthlyComponent } from "../components/monthly-fixed-expenses/components/payment-monthly/payment-monthly.component";



const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsAddComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },
      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },

      { path: 'select-expenses/:id', component: SelectExpensesComponent },

      // { path: 'category-expenses-add', component: AddCategorySubcategoryExpensesComponent },
      { path: 'category-expenses-add-edit', component: EditCategorySubcategoryExpensesComponent },

      { path: 'add-credit-card-expenses', component: AddCreditCardExpensesComponent },


      { path: 'list-monthly-fixed-expenses/:id', component: ListMonthlyFixedExpensesComponent },
      { path: 'list-credit-card-expenses/:id', component: ListCreditCardExpensesComponent },
      { path: 'monthly-fixed-expenses-add', component: MonthlyFixedExpensesAddComponent },
      { path: 'view-monthly-fixed-expenses/:id', component: ViewMonthlyFixedExpensesComponent },

      { path: 'yearly-fixed-expenses-add', component: YearlyFixedExpensesAddComponent },
      { path: 'yearly-fixed-expenses-list', component: ListYearlyFixedExpensesComponent },

      { path: 'add-financings-loans-expenses', component: AddFinancingsLoansExpensesComponent },

      { path: 'variable-expenses-add', component: VariableExpensesAddComponent },


      { path: 'payment', component: PaymentMonthlyComponent },
      // { path: 'payment', component: PaymentComponent },
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
