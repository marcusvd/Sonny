import { MonthsSelectComponent } from '../../../../../../shared/components/months-select/months-select-g.component';
import { BankCardNumberPipe } from '../../../../../../shared/pipes/bank-card-number.pipe';
import { FilterListCollectDeliverComponent } from '../../../commons-components/filter-list-collect-deliver/filter-list-collect-deliver.component';
import { ListCollectDeliverService } from '../services/list-collect-deliver.service';
import { InputFieldGComponent } from '../../../../../../shared/components/input-field-g/input-field-g.component';
import { SubtitleCollectDeliverComponent } from '../../../commons-components/subtitle-collect-deliver/subtitle-collect-deliver.component';

export const ListCollectDeliverImports: any[] = [
   FilterListCollectDeliverComponent,
   InputFieldGComponent,
   SubtitleCollectDeliverComponent
]

export const ListCollectDeliverProviders: any[] = [
   BankCardNumberPipe,
   ListCollectDeliverService
]
