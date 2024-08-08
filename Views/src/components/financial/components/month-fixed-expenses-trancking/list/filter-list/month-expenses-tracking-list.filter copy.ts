import { Observable, of } from "rxjs";
import { MonthFixedExpensesTrackingListGridDto } from "../dto/month-fixed-expenses-tracking-list-grid-dto";

export class MonthExpensesTrackingListFilterCopy {

  private minValue = new Date('0001-01-01T00:00:00');
  private currentDate: Date = new Date();
  private currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)


  entities$: Observable<MonthFixedExpensesTrackingListGridDto[]>

  current(entities: MonthFixedExpensesTrackingListGridDto[], currentPage: number, pageSize: number) {

    const result = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expiration).getFullYear() && new Date(x.expiration).getMonth() == this.currentDate.getMonth()).slice(currentPage, pageSize)

    this.entities$ = of(result)

    return this.entities$
  }

  expires(entities: MonthFixedExpensesTrackingListGridDto[], selectedMonth: number, currentPage: number, pageSize: number) {

    const year = entities.filter(x => this.currentDate.getFullYear() == new Date(x.expiration).getFullYear())

    const month = year.filter(x => new Date(x.expiration).getMonth() == selectedMonth)

    const isPaid = month.filter(x => this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear())

    const result = isPaid.filter(x => this.currentDate > new Date(x.expiration)).slice(currentPage, pageSize)

    this.entities$ = of(result)

    return this.entities$
  }






}
