import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'confirmation-panel',
  template: `
<div mat-dialog-title><h1>{{data.title}}</h1></div>
<div fxLayout="column" >
<mat-grid-list [cols]="2" [rowHeight]="'50px'">

<div fxLayout="row" *ngFor="let entity of data.entity | keyvalue">
<div *ngIf="entity.value">
      <div fxLayout="column" >
      <mat-grid-tile>
            <h3>{{entity.key}}</h3>
    </mat-grid-tile>
      </div>
<div fxLayout="column" fxLayoutAlign="center center">
      <mat-grid-tile>
      {{entity.value | displayNameHandle:entity.key}}
    </mat-grid-tile>
    </div>
    </div>
</div>



</mat-grid-list>
</div>

<div mat-dialog-actions>
<div fxLayout="row" fxLayoutAlign="space-between stretch" style="margin-top:30px;">
  <button mat-dialog-close mat-button style="background-color: rgb(38, 187, 38); color: white;" (click)="clickedYes(btn1)">{{btn1}}</button>
  <button mat-button mat-dialog-close style="background-color: rgb(24, 121, 24); color: white; " (click)="clickedNo(btn2)">{{btn2}}</button>
  </div>
</div>

 <!-- <div class="break">
  <div fxLayout="row" fxLayoutGap="30px">
    <div fxLayout="column">

    </div>
  </div>
  <mat-dialog-content class="break">

  </mat-dialog-content>
  <div fxLayout="row" fxLayoutAlign="space-between stretch" style="margin-top:30px;">


  </div>
</div> -->
`,
  styles: [
    `
/* .break {
  word-wrap: break-word;
}

#left {
  display: inline flex;
}

#right {
  display: inline flex;
} */
`
  ]
})
export class ConfirmationPanelComponent extends BaseForm implements OnInit {

  // @Input() public first: string;
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
    console.log(yes)
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    console.log(no)
    this._DialogRef.close(no);
  }

  ngOnInit(): void {
  }

}
