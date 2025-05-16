
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from '../../../../../../src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../../../../src/components/financial/components/bank-account-cards/dto/card-dto';
import { TypeCardDtoEnum } from '../../../../../../src/components/financial/components/bank-account-cards/dto/enums/type-card-dto.enum';
import { PixDto } from '../../../../../../src/components/financial/components/bank-account-cards/dto/pix-dto';
import { environment } from '../../../../../../src/environments/environment';
import { BaseForm } from '../../../../../../src/shared/components/inheritance/forms/base-form';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from '../../../../../../src/shared/pipes/bank-card-number.pipe';
import { SpinnerGComponent } from '../../../../../shared/components/spinner-g/component/spinner-g.component';
import { BankAccountGetService } from './bank-account-get.service';

@Component({
  selector: 'get-bank-account-cards-select',
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
  styleUrls: ['./bank-account-mat-select-single.component.scss'],
  providers: [BankAccountGetService],
})
export class GetBankAccountCardsSelectComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    private _bankAccountGetService: BankAccountGetService,
  ) { super() }

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  ngOnChanges(changes: SimpleChanges): void {

    // if (!this.radioHideShow) {
    //   this.selectedRadio = -0;
    //   this.removeAllValidators();
    // }
  }

  @Input() override formMain: FormGroup;
  @Input() urlBackEndApi: string = '';
  @Input() typeCardToDisable: TypeCardDtoEnum;
  // @Input() radioOptionRemove: number[] = [];
  // @Input() radioHideShow = true;
  // @Input() selectedRadio = 0;
  @Input() bankAccountFormControlName = 'bankAccountId';

  // @Output() selectedRadioOut = new EventEmitter<number>();
  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  @Output() cardsFromSelectedBank = new EventEmitter<number>();
  @Output() pixesFromSelectedBan = new EventEmitter<number>();

  $banckAccount: Observable<BankAccountDto[]>;
  bankAccount!: BankAccountDto;
  cards: CardDto[];
  pixes: PixDto[];

  // @Input() optionsRadio: RadioOptions[] = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }];
  // optionsAvailable() {
  //   if (this.radioOptionRemove)
  //     this.radioOptionRemove.forEach(
  //       x => {
  //         const opt = this.optionsRadio.findIndex(o => o.id == x);
  //         if (opt !== -1)
  //           this.optionsRadio.splice(opt, 1);
  //       }
  //     )
  // }


  // onSelectedRadio(value?: MatRadioChange) {
  //   this.selectedRadio = value?.value;
  //   this.selectedRadioOut.emit(value?.value)

  //   if (this.selectedRadio === 0)
  //     this.AddValidatorsPix();

  //   if (this.selectedRadio === 1)
  //     this.AddValidatorsCard();

  //   if (this.selectedRadio === 2) {
  //     console.log('OUTROS')
  //     this.AddValidatorsOtherPaymentMethods();
  //   }
  // }

  // AddValidatorsPix() {
  //   this.addValidators(this.formMain, ['pixId']);
  //   this.removeValidators(this.formMain, ['othersPaymentMethods', 'cardId']);
  // }

  // AddValidatorsCard() {
  //   this.addValidators(this.formMain, ['cardId']);
  //   this.removeValidators(this.formMain, ['othersPaymentMethods', 'pixId']);
  // }

  // AddValidatorsOtherPaymentMethods() {
  //   this.addValidators(this.formMain, ['othersPaymentMethods']);
  //   this.removeValidators(this.formMain, ['cardId', 'pixId']);
  // }

  // removeAllValidators() {
  //   this.removeValidators(this.formMain, ['cardId', 'pixId', 'othersPaymentMethods']);
  // }

  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y?.id === value));
      const selectedCards = x?.find(y => y.id === value)?.cards
      this.cards = selectedCards?.filter(x => x.type != this.typeCardToDisable) ?? [];
      // this.pixes = x.find(y => y.id === value)?.pixes ?? [];
      this.bankAccount = x.find(y => y.id === value) ?? new BankAccountDto();
    })
    // this.selectedRadioOut.emit(this.selectedRadio);
  }


  onCardsFromSelectedBank(value: number) {
    this.cardsFromSelectedBank.emit(value);
    // this.validatorsPayment();
  }


  // onPixesFromSelectedBank(value: number) {
  //   this.validatorsPayment();
  //   this.pixesFromSelectedBan.emit(value)
  //   // this.sendSelected();
  // }

  // @Input() set validatorsPaymentBtnAction(value: boolean) {
  //   if (value)
  //     this.validatorsPayment();
  // }

  // validatorsPayment() {

  //   if (this.formMain?.get('pixId')?.value)
  //     this.AddValidatorsPix();

  //   if (this.formMain?.get('cardId')?.value)
  //     this.AddValidatorsCard();

  //   if (this.formMain?.get('othersPaymentMethods')?.value)
  //     this.AddValidatorsOtherPaymentMethods();
  // }


  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnInit(): void {

    this.$banckAccount = this._bankAccountGetService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);

    // this.optionsAvailable();

  }


}
