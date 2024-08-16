import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaymentComponent } from "src/shared/components/financial/payment/payment.component";
import { BankAccountCardsAddComponent } from "../components/bank-account-cards/add/bank-account-cards-add.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { EditCategorySubcategoryExpensesComponent } from "../components/common-components/category-subcategory-expenses/edit/edit-category-subcategory-expenses.component";
import { SelectExpensesComponent } from "../components/common-components/select-expenses/components/select/select-expenses.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { MonthlyFixedExpensesTrackingListComponent } from '../components/monthly-fixed-expenses-trancking/list/monthly-fixed-expenses-tracking-list.component';
import { ViewMonthlyFixedExpensesTrackingComponent } from "../components/monthly-fixed-expenses-trancking/view/view-monthly-fixed-expenses-tracking.component";
import { MonthlyFixedExpensesAddComponent } from "../components/monthly-fixed-expenses/components/add/monthly-fixed-expenses-add.component";
import { MonthlyFixedExpensesListComponent } from "../components/monthly-fixed-expenses/components/list/monthly-fixed-expenses-list.component";
import { VariableExpensesAddComponent } from "../components/variable-expenses/components/add/variable-expenses-add.component";
import { YearlyFixedExpensesAddComponent } from "../components/yearly-fixed-expenses/components/add/yearly-fixed-expenses-add.component";
import { YearlyFixedExpensesListComponent } from "../components/yearly-fixed-expenses/components/list/yearly-fixed-expenses-list.component";



const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsAddComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },
      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },

      { path: 'select-expenses/:id', component: SelectExpensesComponent },

      // { path: 'category-expenses-add', component: AddCategorySubcategoryExpensesComponent },
      { path: 'category-expenses-add-edit', component: EditCategorySubcategoryExpensesComponent },

      { path: 'monthly-fixed-expenses-tracking-list/:id', component: MonthlyFixedExpensesTrackingListComponent },
      { path: 'monthly-fixed-expenses-list', component: MonthlyFixedExpensesListComponent },
      { path: 'monthly-fixed-expenses-add', component: MonthlyFixedExpensesAddComponent },
      { path: 'view-monthly-fixed-expenses-tracking/:id', component: ViewMonthlyFixedExpensesTrackingComponent },

      { path: 'yearly-fixed-expenses-add', component: YearlyFixedExpensesAddComponent },
      { path: 'yearly-fixed-expenses-list', component: YearlyFixedExpensesListComponent },

      { path: 'variable-expenses-add', component: VariableExpensesAddComponent },


      { path: 'payment', component: PaymentComponent },
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
