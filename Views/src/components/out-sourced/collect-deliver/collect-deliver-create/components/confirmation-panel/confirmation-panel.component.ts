import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'confirmation-panel',
  template: `
<div fxLayout="column" >

<div mat-dialog-title fxLayoutAlign="center center"><h1>{{data.title}}</h1></div>

<mat-dialog-content>
<br>
<mat-grid-list [cols]="2" [rowHeight]="'50px'">

<div fxLayout="row" *ngFor="let entity of data.entity | keyvalue" class="center">
    <div *ngIf="entity.value">
      <div fxLayout="column">
      <mat-grid-tile>
           <span><h3 class="mat-grid-tile-content" [style]="chargeFrom">{{entity.key}}</h3></span>
           <span *ngIf="entity.key === 'Cobrar de Cliente'"><h3 class="mat-grid-tile-content" style="color:red;">{{entity.key}}</h3></span>
           <span *ngIf="entity.key === 'Cobrar de Parceiro'"><h3 class="mat-grid-tile-content" style="color:red;">{{entity.key}}</h3></span>
           <span *ngIf="entity.key === 'Custo da base'"><h3 class="mat-grid-tile-content" style="color:red;">{{entity.key}}</h3></span>
      </mat-grid-tile>
      </div>
      <div fxLayout="column">
      <mat-grid-tile>
      <div class="mat-grid-tile-content-center">{{entity.value | displayNameHandle:entity.key}}</div>
      </mat-grid-tile>
      </div>
    </div>
</div>

</mat-grid-list>

</mat-dialog-content>
<div  mat-dialog-actions fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="50px" style="margin-top:30px;">
    <div fxLayout="column">
    <button mat-dialog-close mat-button style="background-color: rgb(38, 187, 38); color: white;" (click)="clickedYes(btn1)">{{btn1}}</button>
    </div>
    <div fxLayout="column">
      <button mat-button mat-dialog-close style="background-color: rgb(24, 121, 24); color: white; " (click)="clickedNo(btn2)">{{btn2}}</button>
    </div>
  </div>
</div>
`,
  styles: [
    `
.mat-grid-tile-content{
    justify-content: flex-start !important ;
    align-items: flex-start !important;
 }
:ng-deep .mat-grid-tile-content-center{
    justify-content: flex-center !important ;
    align-items: flex-center !important;
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
