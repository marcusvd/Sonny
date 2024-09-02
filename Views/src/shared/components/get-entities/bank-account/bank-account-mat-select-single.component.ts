import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { PixDto } from 'src/components/financial/components/bank-account-cards/dto/pix-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountGetService } from './bank-account-get.service';
import { TypeCardDtoEnum } from 'src/components/financial/components/bank-account-cards/dto/enums/type-card-dto.enum';
import { RadioOptions } from './dto/radio-options';
import { SelectedPaymentDto } from './dto/selected-payment-dto';

@Component({
  selector: 'bank-account-mat-select-single',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatRadioModule,
    BankCard4LastDigitsPipe,
    BankCardNumberPipe,
    CommonModule
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
  `],
  providers: [BankAccountGetService],
})
export class BankAccountMatSelectSingleComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    private _bankAccountGetService: BankAccountGetService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  ngOnChanges(changes: SimpleChanges): void {
    this.$banckAccount = this._bankAccountGetService.getAll(this.companyId.toString(), `_FN_BanksAccounts/${this.urlBackEndApi}`);
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = null;
  @Input() typeCardToDisable: TypeCardDtoEnum = null;
  @Input() radioOptionRemove: string[] = null;
  @Input() SelectedRadio: string = 'Pix';
  @Input() onlyCards: boolean = false;

  @Output() formIsValid = new EventEmitter<boolean>();
  $banckAccount: Observable<BankAccountDto[]>;
  bankAccount: BankAccountDto = null;
  cards: CardDto[];
  pixes: PixDto[];
 
  optionsRadio: RadioOptions[] = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }];

  optionsAvailable() {
    if (this.radioOptionRemove)
      this.radioOptionRemove.forEach(
        x => {
          const opt = this.optionsRadio.findIndex(o => o.name == x);
          if (opt !== -1)
            this.optionsRadio.splice(opt, 1);
        }
      )
  }


  onSelectedRadio(value?: MatRadioChange) {
    this.SelectedRadio = value.value;

    if (this.SelectedRadio === 'Pix') {
      this.addValidators('idPix');
      this.removeValidators('others');
      this.removeValidators('idCard');
    }
    if (this.SelectedRadio === 'Cartão') {
      this.addValidators('idCard');
      this.removeValidators('others');
      this.removeValidators('idPix');
    }
    if (this.SelectedRadio === 'Outros') {
      this.addValidators('others');
      this.removeValidators('idCard');
      this.removeValidators('idPix');
    }

    this.sendSelected();
  }

  addValidators(field: string) {
    this.formMain.get(field).setValidators(Validators.required);
    this.formMain.get(field).updateValueAndValidity();
  }

  removeValidators(field: string) {
    this.formMain.get(field).setValue(null);
    this.formMain.get(field).removeValidators(Validators.required);
    this.formMain.get(field).updateValueAndValidity();
  }

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
      const selectedCards = x.find(y => y.id === value).cards
      this.cards = selectedCards.filter(x => x.type != this.typeCardToDisable);
      this.pixes = x.find(y => y.id === value).pixes;
      this.bankAccount = x.find(y => y.id === value);
      this.sendSelected();
    })

  }

  @Output() cardsFromSelectedBan = new EventEmitter<BankAccountDto>();
  onCardsFromSelectedBank(value: number) {
    this.sendSelected();
  }

  @Output() pixesFromSelectedBan = new EventEmitter<BankAccountDto>();
  onPixesFromSelectedBank(value: number) {
    this.sendSelected();
  }


  formLoadBankAccount() {
    return this.formMain = this._fb.group({
      idBankAccount: ['', [Validators.required]],
      idCard: ['', []],
      idPix: ['', [Validators.required]],
      others: ['', []]
    })
  }


  @Output() selectedPayment = new EventEmitter<SelectedPaymentDto>();

  @Input() set btnCheckIsFormValid(isValid: boolean) {
    if (isValid) {
      this.sendSelected();
      console.log('AQUI')
    }

  }

  sendSelected() {
    const selected: SelectedPaymentDto = this.formMain.value;
    this.formIsValid.emit(this.formMain.valid);

    if (!this.formMain.valid) {
      this.formMain.markAllAsTouched();
      this.formMain.markAsDirty();
    }

    this.selectedPayment.emit(selected);
  }


  ngOnInit(): void {
    this.formLoadBankAccount();
    this.optionsAvailable();

  }


}
