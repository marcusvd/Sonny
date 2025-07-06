import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { BankCardNumberPipe } from '../../../../../../../shared/pipes/bank-card-number.pipe';
// import { ViewBankAccountComponent } from '../../../../common-components/view-bank-account/view-bank-account.component';
import { CreditCardSelectComponent } from '../credit-card-select/credit-card-mat-select.component';
import { FinancialSubtitleComponent } from '../../../../common-components/subtitle/financial-subtitle.component';
import { ViewDefaultComponent } from 'src/shared/components/view-default/view-default.component';


export const ListCreditCardInvoicesImports: any[] = [
  MonthsSelectComponent,
  CreditCardSelectComponent,
  // ViewBankAccountComponent,
  FinancialSubtitleComponent,
  ViewDefaultComponent
]
export const ListCreditCardInvoicesProviders: any[] = [
  BankCardNumberPipe,
]
