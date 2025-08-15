import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddBankAccountCardsComponent } from "../components/bank-account-cards/add/add-bank-account-cards.component";
import { EditBankAccountCardsComponent } from "../components/bank-account-cards/edit/edit-bank-account-cards.component";
import { ListBanksAccountsCardsComponent } from "../components/bank-account-cards/list/list-banks-accounts-cards.component";
import { EditCategorySubcategoryExpensesComponent } from "../components/common-components/category-subcategory-expenses/edit/edit-category-subcategory-expenses.component";
import { AddCreditCardExpensesComponent } from "../components/credit-card-fixed-expenses/components/add/add-credit-card-expenses.component";
import { ListCreditCardExpensesComponent } from "../components/credit-card-fixed-expenses/components/list/list-credit-card-expenses.component";
import { AddFinancingsLoansExpensesComponent } from "../components/financings-loans-expenses/components/add/add-financings-loans-expenses.component";
import { MonthlyFixedExpensesAddComponent } from "../components/monthly-fixed-expenses/components/add/monthly-fixed-expenses-add.component";
import { ListMonthlyFixedExpensesComponent } from "../components/monthly-fixed-expenses/components/list/list-monthly-fixed-expenses.component";
import { PaymentMonthlyComponent } from "../components/monthly-fixed-expenses/components/payment-monthly/payment-monthly.component";
import { ViewMonthlyFixedExpensesComponent } from "../components/monthly-fixed-expenses/components/view/view-monthly-fixed-expenses.component";

import { YearlyFixedExpensesAddComponent } from "../components/yearly-fixed-expenses/components/add/yearly-fixed-expenses-add.component";
import { ListYearlyFixedExpensesComponent } from "../components/yearly-fixed-expenses/components/list/list-yearly-fixed-expenses.component";
import { PaymentYearlyComponent } from "../components/yearly-fixed-expenses/components/payment-yearly/payment-yearly.component";
// import { PaymentFinancingsLoansComponent } from "../components/financings-loans-expenses/components/payment-financings-loans-expenses/payment-financings-loans-expenses.component";
import { ViewExpensesGComponent } from "../components/common-components/view-expenses-g/view-expenses-g.component";
import { ListCreditCardInvoicesComponent } from "../components/credit-card-fixed-expenses/components/list-invoices/list-credit-card-invoices.component";
import { PaymentCreditCardsInvoicesComponent } from "../components/credit-card-fixed-expenses/components/payment-credit-cards-invoices/payment-credit-cards-invoices.component";
import { ListFinancingsLoansExpensesInstallmentComponent } from "../components/financings-loans-expenses/components/list-installment/list-financings-loans-expenses-installment.component";
import { ListFinancingsLoansExpensesComponent } from "../components/financings-loans-expenses/components/list/list-financings-loans-expenses.component";
import { PaymentFinancingsLoansInstallmentComponent } from "../components/financings-loans-expenses/components/payment-financings-loans-expenses-installment/payment-financings-loans-expenses-installment.component";
import { AddPixExpensesComponent } from "../components/pix-expenses/components/add/add-pix-expenses.component";
import { PixExpensesListComponent } from "../components/pix-expenses/components/list/pix-expenses-list.component";

import {AddCashWithdrawnExpensesComponent} from "../components/cash-withdrawn-expense/components/add/add-cash-withdrawn-expenses.component";
import {ListCashWithdrawnExpensesComponent} from "../components/cash-withdrawn-expense/components/list/list-cash-withdrawn-expenses.component";
import {EditCashWithdrawnExpensesComponent} from "../components/cash-withdrawn-expense/components/edit/edit-cash-withdrawn-expenses.component";


const Routes: Routes = [

  { path: 'create-bank-account-cards', component: AddBankAccountCardsComponent },
  { path: 'edit-bank-account-cards/:id', component: EditBankAccountCardsComponent },
  { path: 'list-bank-account-cards', component: ListBanksAccountsCardsComponent },

  // { path: 'select-expenses/:id', component: SelectExpensesComponent },

  { path: 'category-expenses-add-edit', component: EditCategorySubcategoryExpensesComponent },

  { path: 'add-credit-card-expenses', component: AddCreditCardExpensesComponent },
  { path: 'list-credit-card-invoices', component: ListCreditCardInvoicesComponent },
  { path: 'list-credit-card-expenses/:id', component: ListCreditCardExpensesComponent },
  { path: 'payment-credit-card-expenses', component: PaymentCreditCardsInvoicesComponent },

  { path: 'list-pix-expenses', component: PixExpensesListComponent },
  { path: 'add-pix-expenses', component: AddPixExpensesComponent },

  { path: 'list-monthly-fixed-expenses', component: ListMonthlyFixedExpensesComponent },
  { path: 'monthly-fixed-expenses-add', component: MonthlyFixedExpensesAddComponent },
  { path: 'view-monthly-fixed-expenses/:id', component: ViewMonthlyFixedExpensesComponent },
  { path: 'payment-monthly', component: PaymentMonthlyComponent },

  { path: 'yearly-fixed-expenses-add', component: YearlyFixedExpensesAddComponent },
  { path: 'yearly-fixed-expenses-list', component: ListYearlyFixedExpensesComponent },
  { path: 'payment-yearly', component: PaymentYearlyComponent },

  { path: 'list-financings-loans-expenses', component: ListFinancingsLoansExpensesComponent },
  { path: 'add-financings-loans-expenses', component: AddFinancingsLoansExpensesComponent },
  { path: 'list-financings-loans-expenses-installment/:id', component: ListFinancingsLoansExpensesInstallmentComponent },
  { path: 'view-financings-loans-expenses', component: ViewExpensesGComponent },
  { path: 'payment-financings-loans', component: PaymentFinancingsLoansInstallmentComponent },

  { path: 'add-cash-withdrawn-expenses', component: AddCashWithdrawnExpensesComponent },
  { path: 'list-cash-withdrawn-expenses', component: ListCashWithdrawnExpensesComponent },
  { path: 'edit-cash-withdrawn-expenses/:id', component: EditCashWithdrawnExpensesComponent },


  // { path: 'payment', component: PaymentComponent },

]

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
  providers: []
})


export class FinancialRoutingModule {

}
