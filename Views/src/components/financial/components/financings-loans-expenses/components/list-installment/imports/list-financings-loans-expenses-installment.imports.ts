import { ListGComponent } from '../../../../../../../shared/components/list-g/list/list-g.component';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { FinancingValuesComponent } from '../../../../financings-loans-expenses/components/list-installment/financing-values/financing-values.component';
import { ListFinancingsLoansExpensesInstallmentService } from '../services/list-financings-loans-expenses-installment.service';

export const ListFinancingsLoansExpensesInstallmentImports: any[] = [
  FilterBtnRadioComponent,
  FinancingValuesComponent,
  ListGComponent
]

export const ListFinancingsLoansExpensesInstallmentProviders: any[] = [
  PtBrDatePipe,
  PtBrCurrencyPipe,
  ListFinancingsLoansExpensesInstallmentService
]
