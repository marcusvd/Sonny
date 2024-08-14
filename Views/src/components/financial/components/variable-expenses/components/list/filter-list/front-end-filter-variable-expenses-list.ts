import * as diacritics from 'diacritics';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { VariableExpensesListGridDto } from '../dto/variable-expenses-list-grid-dto';

export class FrontEndFilterVariableExpenseslist {

  private minValue = new Date('0001-01-01T00:00:00');
  private currentDate: Date = new Date();
  private currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  private stringHandler(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    const result = noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
    return result.toLowerCase();
  }

  private removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

  current(entities: VariableExpensesListGridDto[], currentPage: number, pageSize: number) {
    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear() && new Date(x.paidDay).getMonth() == this.currentDate.getMonth()).slice(currentPage, pageSize)

    return of(result)
  }

  selectedMonth(entities: VariableExpensesListGridDto[], currentPage: number, pageSize: number, selectedMonth: number,) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear()
      &&
      new Date(x.paidDay).getMonth() == selectedMonth).slice(currentPage, pageSize)

    return of(result)
  }

  getAllLessThanOrEqualCurrentDate(entities: VariableExpensesListGridDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x =>
      //check Year
      (this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear())
      &&
      //check month
      (new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())
    );

    return of(result.slice(currentPage, pageSize))
  }

  searchField(entities: VariableExpensesListGridDto[], selectedMonth: number, currentPage: number, pageSize: number, term: string) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear())
        &&
        //check month
        (new Date(x.paidDay).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        this.stringHandler(x.category).includes(this.stringHandler(term))
        ||
        this.stringHandler(x.description).includes(this.stringHandler(term)))
        .slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.paidDay).getFullYear())
        &&
        //check month
        (new Date(x.paidDay).getMonth() == selectedMonth)
      );

      return of(checkPeriod.filter(x =>
        this.stringHandler(x.category).includes(this.stringHandler(term))
        ||
        this.stringHandler(x.description).includes(this.stringHandler(term)))
        .slice(currentPage, pageSize))
    }
  }

  isdescending = true;
  orderByFrontEnd(entities$: Observable<VariableExpensesListGridDto[]>, field: string) {
    this.isdescending = !this.isdescending;

    if (field.toLowerCase() === 'subcategoria') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.subcategory.localeCompare(y.subcategory))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.subcategory.localeCompare(x.subcategory))));
    }

    if (field.toLowerCase() === 'categoria') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.category.localeCompare(x.category))));
    }

    if (field.toLowerCase() === 'descrição') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y.category.localeCompare(x.category))));
    }

    if (field.toLowerCase() === 'vencimento') {

      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.paidDay).getTime() - new Date(y.paidDay).getTime();
        else
          return new Date(y.paidDay).getTime() - new Date(x.paidDay).getTime();
      })))

    }

    if (field.toLowerCase() === 'preço') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          console.log(priceX)
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          return priceY - priceX;
        }
      })))

    }

    if (field.toLowerCase() === 'status') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.paidDay).getTime() - this.minValue.getTime();
        else
          return this.minValue.getTime() - new Date(x.paidDay).getTime();
      })))

    }
    return null;
  }

}
