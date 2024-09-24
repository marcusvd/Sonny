import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
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
    FlexLayoutModule,
    BankCardNumberPipe,
    MatProgressSpinnerModule
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
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];

  spinner:boolean = true;
  ngOnChanges(changes: SimpleChanges): void {
    this.$cards = this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
   
    const length = this.$cards.pipe(
      map(x => {
        if (x.length > 0)
          this.spinner = false
      }),
    ).subscribe();

  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() urlBackEndApi: string = null;

  $cards: Observable<CardDto[]>;
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
