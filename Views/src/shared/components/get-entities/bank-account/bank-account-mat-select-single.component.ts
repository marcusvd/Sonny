import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { TypeCardDtoEnum } from 'src/components/financial/components/bank-account-cards/dto/enums/type-card-dto.enum';
import { PixDto } from 'src/components/financial/components/bank-account-cards/dto/pix-dto';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { IScreen } from '../../inheritance/responsive/iscreen';
import { SpinnerGComponent } from '../../spinner-g/component/spinner-g.component';
import { BankAccountGetService } from './bank-account-get.service';
import { RadioOptions } from './dto/radio-options';

@Component({
  selector: 'get-bank-account-select-single',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatRadioModule,
    BankCard4LastDigitsPipe,
    BankCardNumberPipe,
    SpinnerGComponent
  ],
  templateUrl: './bank-account-mat-select-single.component.html',
  styles: [`
            .warning{
                  color:red;
                  margin-top:-10px;
                  padding-bottom:-10px;
            }
            mat-error{
              margin-bottom:100px;
            }
              #label{
              color:rgb(122,142,99);
              font-weight: bolder;
              }
  `],
  providers: [BankAccountGetService],
})
export class BankAccountMatSelectSingleComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    private _bankAccountGetService: BankAccountGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.radioHideShow) {
      this.selectedRadio = null;
      this.removeAllValidators();
    }
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = null;
  @Input() typeCardToDisable: TypeCardDtoEnum = null;
  @Input() radioOptionRemove: number[] = null;
  @Input() radioHideShow = true;
  @Input() selectedRadio = 0;
  @Input() bankAccountFormControlName = 'bankAccountId';

  $banckAccount: Observable<BankAccountDto[]>;
  bankAccount: BankAccountDto = null;
  cards: CardDto[];
  pixes: PixDto[];

  @Input() screenFieldPosition: string = "column";
  @Input() alignRadios = "center center";
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            //this.alignRadios = 'start start'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            //this.alignRadios = 'start start'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            //this.alignRadios = 'center center';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            //this.alignRadios = 'center center';

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

  @Input() optionsRadio: RadioOptions[] = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }];
  optionsAvailable() {
    if (this.radioOptionRemove)
      this.radioOptionRemove.forEach(
        x => {
          const opt = this.optionsRadio.findIndex(o => o.id == x);
          if (opt !== -1)
            this.optionsRadio.splice(opt, 1);
        }
      )
  }

  @Output() selectedRadioOut = new EventEmitter<number>();
  onSelectedRadio(value?: MatRadioChange) {
    this.selectedRadio = value.value;
    this.selectedRadioOut.emit(value.value)

    if (this.selectedRadio === 0)
      this.AddValidatorsPix();

    if (this.selectedRadio === 1)
      this.AddValidatorsCard();

    if (this.selectedRadio === 2) {
      console.log('OUTROS')
      this.AddValidatorsOtherPaymentMethods();
    }
  }

  AddValidatorsPix() {
    this.addValidators(this.formMain, ['pixId']);
    this.removeValidators(this.formMain, ['othersPaymentMethods', 'cardId']);
  }

  AddValidatorsCard() {
    this.addValidators(this.formMain, ['cardId']);
    this.removeValidators(this.formMain, ['othersPaymentMethods', 'pixId']);
  }

  AddValidatorsOtherPaymentMethods() {
    this.addValidators(this.formMain, ['othersPaymentMethods']);
    this.removeValidators(this.formMain, ['cardId', 'pixId']);
  }

  removeAllValidators() {
    this.removeValidators(this.formMain, ['cardId', 'pixId', 'othersPaymentMethods']);
  }

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
      const selectedCards = x.find(y => y.id === value).cards
      this.cards = selectedCards.filter(x => x.type != this.typeCardToDisable);
      this.pixes = x.find(y => y.id === value).pixes;
      this.bankAccount = x.find(y => y.id === value);
    })
    this.selectedRadioOut.emit(this.selectedRadio);
  }

  @Output() cardsFromSelectedBank = new EventEmitter<number>();
  onCardsFromSelectedBank(value: number) {
    this.cardsFromSelectedBank.emit(value);
    this.validatorsPayment();
  }

  @Output() pixesFromSelectedBan = new EventEmitter<number>();
  onPixesFromSelectedBank(value: number) {
    this.validatorsPayment();
    this.pixesFromSelectedBan.emit(value)
    // this.sendSelected();
  }

  // @Input() set btnCheckIsFormValid(isValid: boolean) {
  //   if (isValid) {
  //     // this.sendSelected();
  //     console.log('AQUI')
  //   }

  // }

  // @Output() selectedPayment = new EventEmitter<SelectedPaymentDto>();
  // sendSelected() {
  //   const selected: SelectedPaymentDto = { ...this.formMain.value };

  //   //this.formIsValid.emit(this.formMain.valid);

  //   if (!this.formMain.valid) {
  //     this.formMain.markAllAsTouched();
  //     this.formMain.markAsDirty();
  //     this.selectedPayment.emit(selected);
  //   }
  // }

  //called by btn save or btn update in other component
  @Input() set validatorsPaymentBtnAction(value: boolean) {
    if (value)
      this.validatorsPayment();
  }

  validatorsPayment() {

    if (this.formMain?.get('pixId')?.value)
      this.AddValidatorsPix();

    if (this.formMain?.get('cardId')?.value)
      this.AddValidatorsCard();

    if (this.formMain?.get('othersPaymentMethods')?.value)
      this.AddValidatorsOtherPaymentMethods();
  }


  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnInit(): void {

    this.$banckAccount = this._bankAccountGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
    // const length = this.$banckAccount.pipe(
    //   map(x => {
    //     if (x.length > 0)
    //       this.spinner = false
    //   }),
    // ).subscribe();
    this.optionsAvailable();
    this.screen();

  }


}
