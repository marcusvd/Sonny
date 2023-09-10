import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'confirmation-panel',
  templateUrl: 'tmp-to-delete.html',
  styles: [
    `
/* *{
  overflow: hidden;
} */

.btns{
  margin-right: 15px;
    /* width: 150px;
    height: 30px; */
    font-size: 15px;
    background-color: rgb(17, 75, 24);
    color: white;
}

.mat-grid-tile-content{
    justify-content: flex-start !important ;
    align-items: flex-start !important;
 }
:ng-deep .mat-grid-tile-content-center{
    justify-content: flex-center !important ;
    align-items: flex-center !important;
 }

.child-1{
  flex-flow: row wrap;
box-sizing: border-box;
display: flex;
}
.child-2{
flex-flow: row wrap;
box-sizing: border-box;
display: flex;
}

`
  ]
})
export class ConfirmationPanelComponent extends BaseForm {

  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;

  constructor(
    private _DialogRef: MatDialogRef<ConfirmationPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _SnackBar: MsgOperation,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super()
    this.title = this.data.title;
    this.messageBody = this.data.messageBody;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
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
