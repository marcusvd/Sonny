import { BankAccountAddService } from '../services/bank-account-add.service';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { BankAccountComponent } from '../../../common-components/bank-account/bank-account.component';
import { BankCardsComponent } from '../../../common-components/bank-cards/bank-cards.component';

export const AddBankAccountCardsImports: any[] = [
  PixComponent,
  BankAccountComponent,
  BankCardsComponent
]

export const AddBankAccountCardsProviders: any[] = [
  BankAccountAddService
]
