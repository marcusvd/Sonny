
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';


import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs/internal/Observable';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { SpinnerGComponent } from 'src/shared/components/spinner-g/component/spinner-g.component';

import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CreditCardInvoicesGetService } from './credit-card-invoices-get.service';

@Component({
  selector: 'credit-card-invoices-mat-select-single',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,

    BankCardNumberPipe,
    SpinnerGComponent
  ],
  templateUrl: './credit-card-invoices-mat-select-single.component.html',
  styles: [`
            .warning{
                  color:red;
                  margin-top:-10px;
                  padding-bottom:-10px;
            }
            mat-error{
              margin-bottom:100px;
            }
  `],
  providers: [CreditCardInvoicesGetService],
})
export class CreditCardInvoicesMatSelectSingleComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    private _creditCardInvoiceGetService: CreditCardInvoicesGetService,
    private _fb: FormBuilder,

  ) {super()}

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];

  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.entities$ = this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
    // this.entities$.subscribe(x=> {
    //   console.log(x)
    // })
  }


  

  @Input() urlBackEndApi: string = null;

  entities$: Observable<CardDto[]>;
  cards: CardDto = null;

  // card$: Observable<CardDto> = null;
  bankAccount: BankAccountDto = null;
  @Output() creditCardIdOutput = new EventEmitter<CardDto>();
  onCardsSelected(creditCard: CardDto) {
    this.bankAccount = creditCard.bankAccount;
    this.creditCardIdOutput.emit(creditCard)
  }

  ngOnInit(): void {

  }


}
