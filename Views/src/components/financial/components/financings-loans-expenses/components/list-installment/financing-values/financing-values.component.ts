import { Component, Input, input, OnInit } from '@angular/core';
import { DetailsValuesInterface } from '../financing-values/dto/details-values.interface';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';


@Component({
  selector: 'financing-values',
  standalone: true,
  imports: [PtBrCurrencyPipe],
  templateUrl: './financing-values.component.html',
  styleUrl: './financing-values.component.scss'
})
export class FinancingValuesComponent implements OnInit {

  constructor() { }

  @Input() valuesFinancing: DetailsValuesInterface = {
    totalPriceToBePaid: 0,
    totalPriceInterest: 0,
    totalPercentageInterest: 0,
    installmentPrice: 0,
    totalPaid: 0,
    remainderToBePaid:0,
  };



  // private readonly controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];

  // constructor(private _financingValuesService: FinancingValuesService) {
  //   super()
  // }

  // paid: number = 0;

  // valuesFinancing: DetailsValuesInterface = {
  //   totalPriceToBePaid: 0,
  //   totalPriceInterest: 0,
  //   totalPercentageInterest: 0,
  //   installmentPrice: 0,
  // };


  // calcs(entities: ListFinancingsLoansExpensesInstallmentDto[], idFinancingsLoansExpenses:string) {

  //   const entitiesPaid = entities.filter(x => new Date(x.wasPaid.key).getFullYear() != this.minValue.getFullYear())
  //   this.paid = entitiesPaid.reduce((x, y) => x + y.priceWasPaidInstallment.keyN, 0)

  //   this._financingValuesService?.loadById$<FinancingsLoansExpensesDto>(`${this.controllerUrl}/GetFinancingsAndLoansGetExpensesByIdAllIncluded`, idFinancingsLoansExpenses)
  //     .pipe(
  //       map(x => {
  //         this.valuesFinancing.totalPriceToBePaid = x.totalPriceToBePaid;
  //         this.valuesFinancing.totalPriceInterest = x.totalPriceInterest;
  //         this.valuesFinancing.totalPercentageInterest = x.totalPercentageInterest;
  //         this.valuesFinancing.installmentPrice = x.installmentPrice;
  //       })
  //     ).subscribe();
  // }
  ngOnInit(): void {
  }

}
