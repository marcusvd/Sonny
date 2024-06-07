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
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountGetService } from './bank-account-get.service';
import { SelectedPaymentDto } from './dto/dto/selected-payment-dto';

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
    this.$banckAccount = this._bankAccountGetService.getAll(this.companyId.toString(), `fnBanksAccounts/${this.urlBackEndApi}`);
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = null;


  companyId: number = JSON.parse(localStorage.getItem('companyId'));

  $banckAccount: Observable<BankAccountDto[]>;
  bankAccount: BankAccountDto = null;
  cards: CardDto[];
  pixes: PixDto[];
  options: string[] = ['Pix', 'Cartão', 'Outros'];
  SelectedRadio: string = 'Pix';

  onSelectedRadio(value: MatRadioChange) {
    this.SelectedRadio = value.value;

    if (this.SelectedRadio === 'Pix') {
      this.formMain.get('idCard').setValue(null);
      this.formMain.get('others').setValue(null);

      if (this.pixes?.length == 0 && this.SelectedRadio) {
        this.formMain.setErrors({ 'required': true })
        this.formMain.touched;
        this.formMain.markAsDirty();
        this.formMain.updateValueAndValidity();
      }
    }
    if (this.SelectedRadio === 'Cartão') {
      this.formMain.get('idPix').setValue(null);
      this.formMain.get('others').setValue(null);
    }
    if (this.SelectedRadio === 'Outros') {
      this.formMain.get('idPix').setValue(null);
      this.formMain.get('idCard').setValue(null);
    }


  }

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
      this.cards = x.find(y => y.id === value).cards;
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
      idPix: ['', []],
      others: ['', []]
    })
  }


  @Output() selectedPayment = new EventEmitter<SelectedPaymentDto>();
  sendSelected() {
    const selected:SelectedPaymentDto =  this.formMain.value;
    this.selectedPayment.emit(selected);
  }


  ngOnInit(): void {
    // this.controlCardHideShowSelect();
    this.formLoadBankAccount();

  }


}
