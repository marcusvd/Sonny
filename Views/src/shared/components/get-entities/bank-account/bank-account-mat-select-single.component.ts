import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountGetService } from './bank-account-get.service';

@Component({
  selector: 'bank-account-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
  cards: CardDto[];

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
      this.cards = x.find(y => y.id === value).cards;
      console.log(this.cards)
      // console.log(this.cards)
    })
    // console.log(this.banckAccountSelected.length)
  }

  @Output() cardsFromSelectedBan = new EventEmitter<BankAccountDto>();
  onCardsFromSelectedBank(value: number) {
    // this?.$banckAccount?.subscribe(x => {
      // console.log(x)
    //   this?.cardsFromSelectedBan?.emit(x.find(y => y.id === value));
    // })
  }

  // mask: string = '';
  // numberMaskCard(value: any) {
  //   if (/^3[47]\d{0,13}$/.test(value)) { // American Express
  //     this.mask = '0000-000000-00000';
  //   } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) { // Diner's Club
  //     this.mask = '0000-000000-0000';
  //   } else if (/^\d{0,16}$/.test(value)) { // Other Credit Cards
  //     this.mask = '0000-0000-0000-0000';
  //   }
  // }

  controlCardHideShowSelect() {
    if (this.banckAccountSelected.length && this.cards)
      return true;
    else
      return false;
  }

  ngOnInit(): void {
    this.controlCardHideShowSelect();
  }


}
