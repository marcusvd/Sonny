
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as _moment from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from '../../../../../../shared/components/sub-title/default/sub-title.component';


const moment = _moment;
//
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    CurrencyMaskModule,
    SubTitleComponent,
  ],
  styles: [`
  `],
})
export class BankAccountComponent extends BaseForm implements OnInit, OnChanges {

  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() mainIcon: string;
  @Input() mainTitle: string;
  @Output() outBankName:EventEmitter<string> = new EventEmitter<string>();


    constructor() { super() }

  ngOnChanges(changes: SimpleChanges): void {

  }




  typeAccountsArray: any[] = [
    { id: 0, typeAccount: 'POUPANÇA' },
    { id: 1, typeAccount: 'CORRENTE' },
  ];

  onInstitutionInput(name: string) {


    this.outBankName.emit(name)



  }

  ngOnInit(): void {

  }


}
