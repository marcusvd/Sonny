import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';


import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { Observable } from 'rxjs/internal/Observable';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SpinnerGComponent } from 'src/shared/components/spinner-g/component/spinner-g.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CreditCardInvoicesGetService } from './credit-card-invoices-get.service';

@Component({
    selector: 'credit-card-invoices-mat-select-single',
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
    providers: [CreditCardInvoicesGetService]
})
export class CreditCardInvoicesMatSelectSingleComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    private _creditCardInvoiceGetService: CreditCardInvoicesGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

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


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() urlBackEndApi: string = null;

  entities$: Observable<CardDto[]>;
  cards: CardDto = null;

  @Input() screenFieldPosition: string = "column";
  @Input() alignRadios: string = "center center";

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            this.alignRadios = 'start start'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            this.alignRadios = 'start start'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            this.alignRadios = 'center center';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            this.alignRadios = 'center center';

            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            this.alignRadios = 'center center';
            break;
          }
        }
      }
    })


  }

  // card$: Observable<CardDto> = null;
  bankAccount: BankAccountDto = null;
  @Output() creditCardIdOutput = new EventEmitter<CardDto>();
  onCardsSelected(creditCard: CardDto) {
    this.bankAccount = creditCard.bankAccount;
    this.creditCardIdOutput.emit(creditCard)
  }

  ngOnInit(): void {
    this.screen();
  }


}
