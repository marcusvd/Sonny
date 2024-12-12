import { of } from "rxjs";

import { MatCheckboxChange } from '@angular/material/checkbox';
import { List } from 'src/shared/components/inheritance/list/list';


export class FilterListProduct {

  // orderBy(field: string) {
  //   if (field.toLowerCase() == 'Vencimento'.toLowerCase())
  //     this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

  //   if (field.toLowerCase() == 'Valor pago'.toLowerCase())
  //     this.entities$ = this.orderByFrontEnd(this.entities$, { priceWasPaidInstallment: 0 });

  //   if (field.toLowerCase() == 'Nº Parcelas'.toLowerCase())
  //     this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

  //   if (field.toLowerCase() == 'Parcela'.toLowerCase())
  //     this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDay': new Date() });

  //   if (field.toLowerCase() == 'status'.toLowerCase())
  //     this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });
  // }

  // filterView(checkbox: MatCheckboxChange) {
  //   if (checkbox.source.value == 'expired') {
  //     this.filter('expired', this.entities, 0, this.pageSize, 'expires', 'wasPaid');
  //     this.filterCheckBoxSelected = 'expired';
  //   }

  //   if (checkbox.source.value == 'pending') {
  //     this.filter('pending', this.entities, 0, this.pageSize,'expires', 'wasPaid');
  //     this.filterCheckBoxSelected = 'pending';
  //   }

  //   if (checkbox.source.value == 'paid') {
  //     this.filter('paid', this.entities, 0, this.pageSize, 'expires', 'wasPaid');
  //     this.filterCheckBoxSelected = 'paid';
  //   }
  // }

}
