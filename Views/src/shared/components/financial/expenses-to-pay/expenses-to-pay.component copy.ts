import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { BtnCancelGComponent } from '../../btn-cancel-g/btn-cancel-g.component';
import { BtnDeleteGComponent } from '../../btn-delete-g/btn-delete-g.component';
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
    PtBrCurrencyPipe
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
export class ExpensesToPayComponentDisabled implements OnInit {

  messageBody: string;
  itemToBePay: string;
  itemDescription: string;
  registeredPrice: string;
  btn1: string;
  btn2: string;
  id: number;

  constructor(
    private _DialogRef: MatDialogRef<ExpensesToPayComponentDisabled>, @Inject(MAT_DIALOG_DATA) private data: any,


  ) {

    this.messageBody = this.data.messageBody;
    this.itemToBePay = this.data.itemToBePay;
    this.itemDescription = this.data.entity.fixedExpenses.nameIdentification
    this.registeredPrice = this.data.entity.price
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
    this.id = this.data.id;
  }

  clickedYes(id: number, yes: string) {
    this._DialogRef.close({ id: id });
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }

  ngOnInit(): void {
  }

}
