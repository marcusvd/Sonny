
import { ListGridFinancingsLoansExpensesDto } from '../dto/list-grid-financings-loans-expenses-dto';
import { List } from 'src/shared/components/inheritance/list/list';



export class FrontEndListFilterFinancingsLoansExpenses extends List{




  // isExpires(entities: ListGridFinancingsLoansExpensesDto[], currentPage: number, pageSize: number) {

  //   return of(entities.filter(x => this.currentDateWithoutHours > new Date(x.expiration).setHours(0, 0, 0, 0)).slice(currentPage, pageSize))

  // }

  // isPending(entities: ListGridFinancingsLoansExpensesDto[], currentPage: number, pageSize: number) {

  //   return of(entities.filter(x => this.minValue.getFullYear() == new Date(x.wasPaid).getFullYear() &&  this.currentDateWithoutHours < new Date(x.expiration).setHours(0, 0, 0, 0)).slice(currentPage, pageSize))

  // }

  // isPaid(entities: ListGridFinancingsLoansExpensesDto[], currentPage: number, pageSize: number) {

  //   return of(entities.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid).getFullYear()).slice(currentPage, pageSize))

  // }



}
