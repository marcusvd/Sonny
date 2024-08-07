import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaymentComponent } from "src/shared/components/financial/payment/payment.component";
import { BankAccountCardsAddComponent } from "../components/bank-account-cards/add/bank-account-cards-add.component";
import { BankAccountCardsEditComponent } from "../components/bank-account-cards/edit/bank-account-cards-edit.component";
import { BanksAccountsCardsListComponent } from "../components/bank-account-cards/list/banks-accounts-cards-list.component";
import { AddCategorySubcategoryExpensesComponent } from "../components/common-components/category-subcategory-expenses/add/add-category-subcategory-expenses.component";
import { SelectExpensesComponent } from "../components/common-components/select-expenses/components/select/select-expenses.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { MonthFixedExpensesTrackingListComponent } from '../components/month-fixed-expenses-trancking/list/month-fixed-expenses-tracking-list.component';
import { ViewMonthFixedExpensesTrackingComponent } from "../components/month-fixed-expenses-trancking/view/view-month-fixed-expenses-tracking.component";
import { MonthFixedExpensesAddComponent } from "../components/month-fixed-expenses/components/add/month-fixed-expenses-add.component";
import { MonthFixedExpensesListComponent } from "../components/month-fixed-expenses/components/list/month-fixed-expenses-list.component";
import { YearlyFixedExpensesAddComponent } from "../components/yearly-fixed-expenses/components/add/yearly-fixed-expenses-add.component";
import { YearlyFixedExpensesListComponent } from "../components/yearly-fixed-expenses/components/list/yearly-fixed-expenses-list.component";



const Routes: Routes = [
  {
    path: '', component: FinancialDashComponent, children: [
      { path: 'create-bank-account-cards', component: BankAccountCardsAddComponent },
      { path: 'edit-bank-account-cards/:id', component: BankAccountCardsEditComponent },
      { path: 'list-bank-account-cards', component: BanksAccountsCardsListComponent },

      { path: 'select-expenses/:id', component: SelectExpensesComponent },

      { path: 'category-expenses-add', component: AddCategorySubcategoryExpensesComponent },

      { path: 'month-fixed-expenses-tracking-list/:id', component: MonthFixedExpensesTrackingListComponent },
      { path: 'month-fixed-expenses-list', component: MonthFixedExpensesListComponent },
      { path: 'month-fixed-expenses-add', component: MonthFixedExpensesAddComponent },
      { path: 'view-month-fixed-expenses-tracking/:id', component: ViewMonthFixedExpensesTrackingComponent },
      
      { path: 'yearly-fixed-expenses-add', component: YearlyFixedExpensesAddComponent },
      { path: 'yearly-fixed-expenses-list', component: YearlyFixedExpensesListComponent },


      
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
