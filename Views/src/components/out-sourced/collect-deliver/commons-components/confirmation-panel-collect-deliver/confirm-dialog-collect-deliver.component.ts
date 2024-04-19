import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BtnCancelGComponent } from 'src/shared/components/btn-confirm-g/btn-cancel-g.component';
import { BtnDeleteGComponent } from 'src/shared/components/btn-delete-g/btn-delete-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { IConfirmDialogCollectDeliver } from './interface/i-confirm-dialog-collect-deliver';

@Component({
  selector: 'confirm-dialog-collect-deliver',
  templateUrl: 'confirm-dialog-collect-deliver.component.html',
  standalone:true,
  imports:[  MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SubTitleComponent,
    BtnCancelGComponent,
    BtnDeleteGComponent],
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
       margin-bottom: -25px
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


export class ConfirmDialogCollectDeliverComponent extends BaseForm {



  constructor(
    private _DialogRef: MatDialogRef<ConfirmDialogCollectDeliverComponent>, @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogCollectDeliver,
    private _SnackBar: MsgOperation,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super()
    // this.title = this.data.title;
    // this.messageBody = this.data.messageBody;
    // this.btn1 = this.data.btn1;
    // this.btn2 = this.data.btn2;
  }

  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            break;
          }
          case 'small': {

            break;
          }
          case 'medium': {

            break;
          }
          case 'large': {

            break;
          }
          case 'xlarge': {

            break;
          }
        }
      }
    })
  }

  clickedYes(yes: string) {
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }


}
