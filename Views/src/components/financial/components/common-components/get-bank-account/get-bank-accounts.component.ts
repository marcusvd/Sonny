
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from '../../../../../components/financial/components/bank-account-cards/dto/bank-account-dto';
import { environment } from '../../../../../environments/environment';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';

import { SpinnerGComponent } from '../../../../../shared/components/spinner-g/component/spinner-g.component';
import { BankCard4LastDigitsPipe, BankCardNumberPipe } from '../../../../../shared/pipes/bank-card-number.pipe';
import { GetBankAccountService } from './get-bank-account.service';

@Component({
  selector: 'get-bank-accounts',
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
  templateUrl: './get-bank-accouns.component.html',
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
  providers: [GetBankAccountService],
})
export class GetBankAccountComponent extends BaseForm implements OnInit {

  constructor(
    private _getBankAccountService: GetBankAccountService,
    private _fb: FormBuilder,

  ) {super()}

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() urlBackEndApi!: string;
  @Input() bankAccountFormControlName = 'bankAccountId';

  $banckAccount: Observable<BankAccountDto[]>;
  bankAccount!: BankAccountDto;

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
      // const selectedCards = x.find(y => y.id === value).cards
      // this.cards = selectedCards.filter(x => x.type != this.typeCardToDisable);
      // this.pixes = x.find(y => y.id === value).pixes;
      // this.bankAccount = x.find(y => y.id === value);
    })
  }




  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnInit(): void {

    this.$banckAccount = this._getBankAccountService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
    // const length = this.$banckAccount.pipe(
    //   map(x => {
    //     if (x.length > 0)
    //       this.spinner = false
    //   }),
    // ).subscribe();

  }


}
