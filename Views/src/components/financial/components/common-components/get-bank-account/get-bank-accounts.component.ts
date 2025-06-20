
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';


import { Observable } from 'rxjs/internal/Observable';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BankAccountDto } from '../../../../../components/financial/components/bank-account-cards/dto/bank-account-dto';
import { environment } from '../../../../../environments/environment';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';
import { SpinnerGComponent } from '../../../../../shared/components/spinner-g/component/spinner-g.component';
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
    SpinnerGComponent
  ],
  templateUrl: './get-bank-accouns.component.html',
  providers: [GetBankAccountService],
})
export class GetBankAccountComponent extends BaseForm implements OnInit {

  constructor(
    private _getBankAccountService: GetBankAccountService
  ) { super() }

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() urlBackEndApi!: string;
  @Input() bankAccountFormControlName = 'bankAccountId';

  $banckAccount: Observable<BankAccountDto[]>;

  @Output() banckAccountSelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
    this?.$banckAccount?.subscribe(x => {
      this?.banckAccountSelected?.emit(x.find(y => y.id === value));
    })
  }

  spinner = false
  spinnerEvent($event: boolean) {
    this.spinner = !$event
  }

  ngOnInit(): void {
    this.$banckAccount = this._getBankAccountService.getAll(this.companyId.toString(), `${this.controllerUrl}/${this.urlBackEndApi}`);
  }


}
