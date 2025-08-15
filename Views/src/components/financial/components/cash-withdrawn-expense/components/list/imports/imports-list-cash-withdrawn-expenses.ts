
import { FinancingValuesComponent } from 'src/components/financial/components/financings-loans-expenses/components/list-installment/financing-values/financing-values.component';
import { MonthsSelectComponent } from '../../../../../../../shared/components/months-select/months-select-g.component';
import { ViewDefaultComponent } from 'src/shared/components/view-default/view-default.component';
import { AddDefaultImports } from '../../../../../../../components/imports/components-default.imports';
import { ListCashWithdrawnExpensesService } from '../../../services/list-cash-withdrawn-expenses.service';

export const ImportsListCashWithdrawnExpenses: any[] = [
  MonthsSelectComponent,
  ViewDefaultComponent,
  AddDefaultImports
]

export const ProvidersListCashWithdrawnExpenses: any[] = [
  ListCashWithdrawnExpensesService
]
