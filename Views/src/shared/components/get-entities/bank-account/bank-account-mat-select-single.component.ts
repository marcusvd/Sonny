import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { Observable } from 'rxjs/internal/Observable';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankAccountGetService } from './bank-account-get.service';

@Component({
  selector: 'bank-account-mat-select-single',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  template: `
 <div [formGroup]="formMain" fxLayout="column">
 <mat-form-field  appearance="outline" fxFlex>
        <mat-label>Conta bancária</mat-label>
        <mat-select placeholder="Pesquise pelo nome" #singleSelect (blur)="onBlur()" (selectionChange)="onBankAccountSelected(singleSelect.value)" formControlName="bankAccountId">
            <mat-option *ngFor="let bankAccount of $banckAccount | async" [value]="bankAccount.id">
                {{bankAccount.institution}}
            </mat-option>
        </mat-select>

    </mat-form-field>
 </div>
  `,
  styles: [`

  `],
  providers: [BankAccountGetService],
})
export class BankAccountMatSelectSingleComponent extends BaseForm implements OnChanges {

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

  @Output() onBlurEvent = new EventEmitter<void>();
  onBlur() {
    this.onBlurEvent.emit();
  }

  @Output() banckAccountelected = new EventEmitter<BankAccountDto>();
  onBankAccountSelected(value: number) {
      this?.$banckAccount?.subscribe(x => {
        // console.log(x)
      this?.banckAccountelected?.emit(x.find(y => y.id === value));
    })
  }

}
