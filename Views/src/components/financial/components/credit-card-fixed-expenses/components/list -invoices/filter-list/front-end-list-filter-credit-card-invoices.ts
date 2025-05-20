
import { List } from 'src/shared/components/inheritance/list/list';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';

export class FrontEndListFilterCreditCardInvoices extends List{

  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;

  orderBy(field: string) {
    if (field.toLowerCase() == 'Vencimento'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

    if (field.toLowerCase() == 'preço'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

    if (field.toLowerCase() == 'Compras até:'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'closingDate': new Date() });

    if (field.toLowerCase() == 'Descrição'.toLowerCase())
      this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });
  }






}
