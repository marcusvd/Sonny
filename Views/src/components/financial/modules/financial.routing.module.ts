import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
import { PaymentMonthlyComponent } from "../components/monthly-fixed-expenses/components/payment-monthly/payment-monthly.component";
import { ViewMonthlyFixedExpensesComponent } from "../components/monthly-fixed-expenses/components/view/view-monthly-fixed-expenses.component";
import { VariableExpensesAddComponent } from "../components/variable-expenses/components/add/variable-expenses-add.component";
import { VariableExpensesListComponent } from "../components/variable-expenses/components/list/variable-expenses-list.component";
import { YearlyFixedExpensesAddComponent } from "../components/yearly-fixed-expenses/components/add/yearly-fixed-expenses-add.component";
import { ListYearlyFixedExpensesComponent } from "../components/yearly-fixed-expenses/components/list/list-yearly-fixed-expenses.component";
import { PaymentYearlyComponent } from "../components/yearly-fixed-expenses/components/payment-yearly/payment-yearly.component";
// import { PaymentFinancingsLoansComponent } from "../components/financings-loans-expenses/components/payment-financings-loans-expenses/payment-financings-loans-expenses.component";
import { ViewExpensesGComponent } from "../components/common-components/view-expenses-g/view-expenses-g.component";
import { ListCreditCardInvoicesComponent } from "../components/credit-card-fixed-expenses/components/list -invoices/list-credit-card-invoices.component";
import { PaymentCreditCardsInvoicesComponent } from "../components/credit-card-fixed-expenses/components/payment-credit-cards-invoices/payment-credit-cards-invoices.component";
import { ListFinancingsLoansExpensesInstallmentComponent } from "../components/financings-loans-expenses/components/list-installment/list-financings-loans-expenses-installment.component";
import { ListFinancingsLoansExpensesComponent } from "../components/financings-loans-expenses/components/list/list-financings-loans-expenses.component";
import { PaymentFinancingsLoansInstallmentComponent } from "../components/financings-loans-expenses/components/payment-financings-loans-expenses-installment/payment-financings-loans-expenses-installment.component";
import { PixExpensesAddComponent } from "../components/pix-expenses/components/add/pix-expenses-add.component";
import { PixExpensesListComponent } from "../components/pix-expenses/components/list/pix-expenses-list.component";




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
      { path: 'list-credit-card-expenses/:id', component: ListCreditCardExpensesComponent },
      { path: 'payment-credit-card-expenses', component: PaymentCreditCardsInvoicesComponent },


      { path: 'list-credit-card-invoices', component: ListCreditCardInvoicesComponent },
      { path: 'list-financings-loans-expenses', component: ListFinancingsLoansExpensesComponent },
      { path: 'pix-expenses-list', component: PixExpensesListComponent },
      { path: 'add-pix-expenses', component: PixExpensesAddComponent },
      { path: 'list-monthly-fixed-expenses', component: ListMonthlyFixedExpensesComponent },
      { path: 'monthly-fixed-expenses-add', component: MonthlyFixedExpensesAddComponent },
      { path: 'view-monthly-fixed-expenses/:id', component: ViewMonthlyFixedExpensesComponent },

      { path: 'yearly-fixed-expenses-add', component: YearlyFixedExpensesAddComponent },
      { path: 'yearly-fixed-expenses-list', component: ListYearlyFixedExpensesComponent },

      { path: 'add-financings-loans-expenses', component: AddFinancingsLoansExpensesComponent },
      { path: 'list-financings-loans-expenses-installment/:id', component: ListFinancingsLoansExpensesInstallmentComponent },
      { path: 'view-financings-loans-expenses', component: ViewExpensesGComponent },
      { path: 'payment-financings-loans', component: PaymentFinancingsLoansInstallmentComponent },

      { path: 'add-variable-expenses', component: VariableExpensesAddComponent },
      { path: 'list-variable-expenses', component: VariableExpensesListComponent },


      { path: 'payment-monthly', component: PaymentMonthlyComponent },
      { path: 'payment-yearly', component: PaymentYearlyComponent },
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
