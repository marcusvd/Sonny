import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { BtnCancelGComponent } from '../../btn-cancel-g/btn-cancel-g.component';
import { BtnDeleteGComponent } from '../../btn-delete-g/btn-delete-g.component';
import { BankAccountMatSelectSingleComponent } from '../../get-entities/bank-account/bank-account-mat-select-single.component';
import { SubTitleComponent } from '../../sub-title/sub-title.component';


@Component({
  selector: 'expenses-to-pay',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SubTitleComponent,
    BtnCancelGComponent,
    BtnDeleteGComponent,
    PtBrCurrencyPipe,
    BankAccountMatSelectSingleComponent
  ],
  providers: [

  ],
  templateUrl: './expenses-to-pay.component.html',
  styles: [
    ` .to-pay-dialog-class {
      mat-dialog-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
          padding: -330px;
          overflow: hidden;
          width: 100%;
          height: 100%;
      }
  }

      mat-card{
       margin-top: -5px;
       margin-left: -25px;
       margin-right: -25px;
       margin-bottom: -25px
      }

      .font-body{
        font-family: Mynerve;
      }
      .margin{
        margin-top:30px;
      }
      .itemToBePay{
        font-family: Mynerve;
        font-weight: bold;
        color: rgb(156,33,29);

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
    private _actRouter: ActivatedRoute,
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
    this._actRouter.data.subscribe(
      {
        next: ((x: any) => {
          console.log(x.loaded as BankAccountDto[])
          console.log(x.loaded as BankAccountDto[])
          //this.BankAccountDto = x.loaded as BankAccountDto[];
        })
      }
    )

  }

}
