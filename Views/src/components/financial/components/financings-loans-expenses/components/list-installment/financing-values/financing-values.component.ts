import { Component, Input, input, OnInit } from '@angular/core';
import { DetailsValuesInterface } from '../financing-values/dto/details-values.interface';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'financing-values',
  standalone: true,
  imports: [PtBrCurrencyPipe, CommonModule, MatCardModule],
  templateUrl: './financing-values.component.html',
  styleUrl: './financing-values.component.scss'
})
export class FinancingValuesComponent {

  constructor() { }

  @Input() valuesFinancing: DetailsValuesInterface = {
    totalPriceToBePaid: 0,
    totalPriceInterest: 0,
    totalPercentageInterest: 0,
    installmentPrice: 0,
    totalPaid: 0,
    remainderToBePaid:0,
    installmentsQuantity:'',
  };

}
