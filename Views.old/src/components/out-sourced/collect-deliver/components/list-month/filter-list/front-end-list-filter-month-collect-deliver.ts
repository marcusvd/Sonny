import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { List } from 'src/shared/components/inheritance/list/list';

export class FrontEndListFilterMonthCollectDeliver extends List{

  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;

  orderBy(field: string) {
    if (field.toLowerCase() == 'mês'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'start': new Date() });

    if (field.toLowerCase() == 'R$ Total'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

  }






}
