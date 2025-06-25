import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { FilterBtnRadioComponent } from '../../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { FinancialSubtitleComponent } from '../../../../common-components/subtitle/financial-subtitle.component';
import { ListCreditCardExpensesService } from '../services/list-credit-card-expenses.service';
import { CreditCardInvoicesMatSelectSingleComponent } from '../../../../credit-card-fixed-expenses/components/credit-card-invoice/credit-card-invoices-mat-select-single.component';
import { ViewBankAccountComponent } from '../../../../common-components/view-bank-account/view-bank-account.component';

export const ListCreditCardExpensesImports: any[] = [
  MonthsSelectComponent,
  FilterBtnRadioComponent,
  FinancialSubtitleComponent,
  CreditCardInvoicesMatSelectSingleComponent,
  ViewBankAccountComponent,
  FinancialSubtitleComponent
]
export const ListCreditCardExpensesProviders: any[] = [
  ListCreditCardExpensesService
]
