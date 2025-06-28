import { ListGComponent } from '../../../../../../../shared/components/list-g/list/list-g.component';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { ListFinancingsLoansExpensesInstallmentService } from '../services/list-financings-loans-expenses-installment.service';

export const ListFinancingsLoansExpensesInstallmentImports: any[] = [
  FilterBtnRadioComponent,
  ListGComponent
]

export const ListFinancingsLoansExpensesInstallmentProviders: any[] = [
  PtBrDatePipe,
  PtBrCurrencyPipe,
  ListFinancingsLoansExpensesInstallmentService
]
