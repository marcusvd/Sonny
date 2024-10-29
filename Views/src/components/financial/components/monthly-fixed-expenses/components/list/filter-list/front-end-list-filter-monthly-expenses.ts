import * as diacritics from 'diacritics';
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ListGridMonthlyFixedExpenseDto } from '../dto/monthly-fixed-expense-tracking-list-grid-dto';
import { List } from 'src/shared/components/inheritance/list/list';

export class FrontEndListFilterMonthlyExpenses extends List {

  

  current(entities: ListGridMonthlyFixedExpenseDto[], currentPage: number, pageSize: number, selectedMonth: number) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expires).getFullYear() && new Date(x.expires).getMonth() == selectedMonth)
    return of(result?.slice(currentPage, pageSize))
  }

  selectedByMonth(entities: ListGridMonthlyFixedExpenseDto[], currentPage: number, pageSize: number, selectedMonth: number) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expires).getFullYear()
      &&
      new Date(x.expires).getMonth() == selectedMonth).slice(currentPage, pageSize)

    return of(result)
  }

  getAllLessThanOrEqualCurrentDate(entities: ListGridMonthlyFixedExpenseDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x =>
      //check Year
      (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      &&
      //check month
      (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
    );

    return of(result.slice(currentPage, pageSize))
  }

  isExpires(entities: ListGridMonthlyFixedExpenseDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires).setHours(0, 0, 0, 0)))
      )

      return of(result.slice(currentPage, pageSize))
    }
  }

  isPending(entities: ListGridMonthlyFixedExpenseDto[], selectedMonth: number, currentPage: number, pageSize: number) {

    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {

      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))

      )

      return of(result.slice(currentPage, pageSize))
    }

  }

  isPaid(entities: ListGridMonthlyFixedExpenseDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())
        &&
        //checkIsPendig
        (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires).getFullYear())
        &&
        //check month
        (new Date(x.expires).getMonth() == selectedMonth)
      );
      return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear()).slice(currentPage, pageSize))
    }
  }

 

}
