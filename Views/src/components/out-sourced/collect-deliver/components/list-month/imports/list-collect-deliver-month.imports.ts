import { SelectInputSearchGComponent } from 'src/shared/components/select-input-search-g/select-input-search-g.component';
import { MonthsSelectComponent } from '../../../../../../shared/components/months-select/months-select-g.component';
import { BankCardNumberPipe } from '../../../../../../shared/pipes/bank-card-number.pipe';
import { ListCollectDeliverMonthService } from '../services/list-collect-deliver-month.service';
import { SubtitleCollectDeliverComponent } from '../../../commons-components/subtitle-collect-deliver/subtitle-collect-deliver.component';

export const ListCollectDeliverMonthImports: any[] = [
   MonthsSelectComponent,
   SubtitleCollectDeliverComponent
]

export const ListCollectDeliverMonthProviders: any[] = [
   BankCardNumberPipe,
   ListCollectDeliverMonthService,
]
