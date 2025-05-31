import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { BankCardNumberPipe } from '../../../../../../../shared/pipes/bank-card-number.pipe';
import { ViewBankAccountComponent } from '../../../../common-components/view-bank-account/view-bank-account.component';
import { CreditCardInvoicesMatSelectSingleComponent } from '../../credit-card-invoice/credit-card-invoices-mat-select-single.component';

export const ListCreditCardExpensesImports: any[] = [
  MonthsSelectComponent,
  CreditCardInvoicesMatSelectSingleComponent,
  ViewBankAccountComponent,
]
export const ListCreditCardExpensesProviders: any[] = [
  BankCardNumberPipe,
]
