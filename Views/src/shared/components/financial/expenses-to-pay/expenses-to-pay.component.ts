import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { BankAccountMatSelectSingleComponent } from '../../get-entities/bank-account/bank-account-mat-select-single.component';
import { SubTitleComponent } from '../../sub-title/sub-title.component';
import { TitleComponent } from '../../title/components/title.component';


@Component({
  selector: 'expenses-to-pay',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SubTitleComponent,
    TitleComponent,
    PtBrCurrencyPipe,
    BankAccountMatSelectSingleComponent
  ],
  providers: [

  ],
  templateUrl: './expenses-to-pay.component.html',
  styles: [
    `
  .mat-card-sub-title {
    height: 100%;
    background-color: rgb(249, 249, 249);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: -330px;
}
   `
  ]
})
export class ExpensesToPayComponent extends BaseForm implements OnInit {

  messageBody: string;
  itemToBePay: string;
  itemDescription: string;
  registeredPrice: string;
  btn1: string;
  btn2: string;
  id: number;

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder
  ) {
    super(_breakpointObserver)

    // this.messageBody = this.data.messageBody;
    // this.itemToBePay = this.data.itemToBePay;
    // this.itemDescription = this.data.entity.fixedExpenses.nameIdentification
    // this.registeredPrice = this.data.entity.price
    // this.btn1 = this.data.btn1;
    // this.btn2 = this.data.btn2;
    // this.id = this.data.id;
  }

  // clickedYes(id: number, yes: string) {
  //   this._DialogRef.close({ id: id });
  // }
  // clickedNo(no: string) {
  //   this._DialogRef.close(no);
  // }
  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      institution: ['', [Validators.required, Validators.maxLength(100)]],
      agency: ['', [Validators.required, Validators.maxLength(20)]],
      managerName: ['', [Validators.maxLength(50)]],
      managerContact: ['', [Validators.maxLength(100)]],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['CORRENTE', [Validators.required]],
      balance: ['', [Validators.required]],
      description: ['', [Validators.maxLength(100)]],
      pixes: this._fb.array([]),
      cards: this._fb.array([]),
    })
  }

  onSelectedBanckAccountelected(bankAccount: any) {
    console.log(bankAccount)
  }

  ngOnInit(): void {

    this.formLoad();


  }

}
