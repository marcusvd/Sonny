import * as diacritics from 'diacritics';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ListGridMonthlyFixedExpenseDto } from '../../../monthly-fixed-expenses/components/list/dto/monthly-fixed-expense-tracking-list-grid-dto';
import { BankAccountCardListGridDto } from '../dto/bank-account-card-list-grid.dto';
import { GeneralUse } from 'src/shared/components/inheritance/general/general-use';

export class FrontEndFilterBanksAccountsCardsList extends GeneralUse {


  isdescending = true;
  orderByFrontEnd(entities$: Observable<BankAccountCardListGridDto[]>, field: string) {
   
    this.isdescending = !this.isdescending;

    if (field.toLowerCase() === 'banco') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.institution.localeCompare(y.institution))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.institution.localeCompare(x.institution))));
    }
    if (field.toLowerCase() === 'titular') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.holder.localeCompare(y.holder))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.holder.localeCompare(x.holder))));
    }  
    if (field.toLowerCase() === 'saldo') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.balance);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.balance);
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.balance);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.balance);
          return priceY - priceX;
        }
      })))

    }
    if (field.toLowerCase() === 'conta') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.account);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.account);
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.account);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.account);
          return priceY - priceX;
        }
      })))
    }
    if (field.toLowerCase() === 'cartões') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.cards);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.cards);
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.cards);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.cards);
          return priceY - priceX;
        }
      })))
    }
    if (field.toLowerCase() === 'tipo') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = x.type;
          const priceY: number = y.type;
          return priceX - priceY;
        }
        else {
          const priceX: number = x.type;
          const priceY: number = y.type;
          return priceY - priceX;
        }
      })))
    }
    if (field.toLowerCase() === 'agencia') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.agency);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.agency);
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.agency);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.agency);
          return priceY - priceX;
        }
      })))
    }
  
    return null;
  }

}
