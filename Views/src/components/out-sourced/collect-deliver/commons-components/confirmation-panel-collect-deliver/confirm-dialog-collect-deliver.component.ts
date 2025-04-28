import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { IConfirmDialogCollectDeliver } from './interface/i-confirm-dialog-collect-deliver';

@Component({
    selector: 'confirm-dialog-collect-deliver',
    templateUrl: 'confirm-dialog-collect-deliver.component.html',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        PtBrCurrencyPipe,
        SubTitleComponent,
        BtnGComponent
    ],
    styles: [
        `
    /*need to put it inside the component caller dialog*/
.confirm-dialog-collect-deliver {
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
       margin-bottom: -25px;
      }
      .label-field{
        font-weight: bold;
      }

      .font-body{
        font-family: Mynerve;
      }
      .margin{
        margin-top:30px;
      }
      .itemToBeDelete{
        font-family: Mynerve;
        font-weight: bold;
        color: rgb(156,33,29);

      }

    `
    ]
})


export class ConfirmDialogCollectDeliverComponent  {



  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogCollectDeliverComponent>, @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogCollectDeliver,
  ) {

    // this.title = this.data.title;
    // this.messageBody = this.data.messageBody;
    // this.btn1 = this.data.btn1;
    // this.btn2 = this.data.btn2;
  }

  // screen() {

  //   this.screenSize().subscribe({
  //     next: (result: IScreen) => {
  //       switch (result.size) {
  //         case 'xsmall': {

  //           break;
  //         }
  //         case 'small': {

  //           break;
  //         }
  //         case 'medium': {

  //           break;
  //         }
  //         case 'large': {

  //           break;
  //         }
  //         case 'xlarge': {

  //           break;
  //         }
  //       }
  //     }
  //   })
  // }

  clickedYes() {
    this._dialogRef.close(true);
  }

  clickedNo() {
    this._dialogRef.close(false);
  }


}
