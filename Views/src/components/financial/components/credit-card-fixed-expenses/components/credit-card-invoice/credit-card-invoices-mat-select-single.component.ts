import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs/internal/Observable';
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
    // FormsModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    // MatInputModule,
    // NgxMatSelectSearchModule,
    // ReactiveFormsModule,
    FlexLayoutModule,
    // MatRadioModule,
    // BankCard4LastDigitsPipe,
    BankCardNumberPipe,
    CommonModule
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
  ngOnChanges(changes: SimpleChanges): void {
    this.$cards = this._creditCardInvoiceGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = null;
  // @Input() typeCardToDisable: TypeCardDtoEnum = null;
  // @Input() radioOptionRemove: string[] = null;
  // @Input() SelectedRadio: string = 'Pix';
  // @Input() onlyCards: boolean = false;
  // @Input() fxLayoutInput: string = 'column';

  //@Output() formIsValid = new EventEmitter<boolean>();
  $cards: Observable<CardDto[]>;
  cards: CardDto = null;
  // cards: CardDto[];
  // pixes: PixDto[];


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

  // optionsRadio: RadioOptions[] = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }];
  // optionsAvailable() {
  //   if (this.radioOptionRemove)
  //     this.radioOptionRemove.forEach(
  //       x => {
  //         const opt = this.optionsRadio.findIndex(o => o.name == x);
  //         if (opt !== -1)
  //           this.optionsRadio.splice(opt, 1);
  //       }
  //     )
  // }

  // onSelectedRadio(value?: MatRadioChange) {
  //   this.SelectedRadio = value.value;

  //   if (this.SelectedRadio === 'Pix') {
  //     this.addValidators('idPix');
  //     this.removeValidators('others');
  //     this.removeValidators('idCard');
  //   }
  //   if (this.SelectedRadio === 'Cartão') {
  //     this.addValidators('idCard');
  //     this.removeValidators('others');
  //     this.removeValidators('idPix');
  //   }
  //   if (this.SelectedRadio === 'Outros') {
  //     this.addValidators('others');
  //     this.removeValidators('idCard');
  //     this.removeValidators('idPix');
  //   }

  //   this.sendSelected();
  // }

  // addValidators(field: string) {
  //   this.formMain.get(field).setValidators(Validators.required);
  //   this.formMain.get(field).updateValueAndValidity();
  // }

  // removeValidators(field: string) {
  //   this.formMain.get(field).setValue(null);
  //   this.formMain.get(field).removeValidators(Validators.required);
  //   this.formMain.get(field).updateValueAndValidity();
  // }

  // @Output() onBlurEvent = new EventEmitter<void>();
  // onBlur() {
  //   this.onBlurEvent.emit();
  // }

  card$: Observable<CardDto> = null;
  // invoices$: Observable<CreditCardExpenseInvoiceDto[]> = null;
  // expenses$: Observable<CreditCardExpenseDto[]> = null;
  bankAccount: BankAccountDto = null;
  @Output() creditCardIdOutput = new EventEmitter<CardDto>();

  onCardsSelected(creditCard: CardDto) {
    // console.log(creditCard.bankAccount.account)
    this.bankAccount = creditCard.bankAccount
  
    // this.card$ = this?.$cards?.pipe(
    //   map(x => x.find(y => y.id == value))
    // )

    this.creditCardIdOutput.emit(creditCard)


    // this.invoices$ = this.card$.pipe(
    //   map(x => x.creditCardExpensesInvoices.filter(y => y.creditCardExpenses.length != 0))
    // )

    // this.creditCardExpenseInvoicesOutput.emit(this.invoices$)

  }

  // @Output() cardsFromSelectedBan = new EventEmitter<number>();
  // onCardsFromSelectedBank(value: number) {
  //   this.cardsFromSelectedBan.emit(value);
  //   this.sendSelected();
  // }

  // @Output() pixesFromSelectedBan = new EventEmitter<BankAccountDto>();
  // onPixesFromSelectedBank(value: number) {
  //   this.sendSelected();
  // }


  // formLoadBankAccount() {
  //   return this.formMain = this._fb.group({
  //     idBankAccount: ['', [Validators.required]],
  //     idCard: ['', [Validators.required]],
  //     idPix: ['', [Validators.required]],
  //     others: ['', []]
  //   })
  // }


  //@Output() selectedPayment = new EventEmitter<SelectedPaymentDto>();

  // @Input() set btnCheckIsFormValid(isValid: boolean) {
  //   if (isValid) {
  //     this.sendSelected();
  //     console.log('AQUI')
  //   }

  // }

  // sendSelected() {
  //   const selected: SelectedPaymentDto = { ...this.formMain.value };

  //   //this.formIsValid.emit(this.formMain.valid);

  //   if (!this.formMain.valid) {
  //     this.formMain.markAllAsTouched();
  //     this.formMain.markAsDirty();
  //   }
  //   this.selectedPayment.emit(selected);
  // }


  ngOnInit(): void {
    // this.formLoadBankAccount();
    // this.optionsAvailable();
    this.screen();
  }


}
