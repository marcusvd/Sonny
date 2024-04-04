import { Component, Inject, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { SubTitleComponent } from '../sub-title/sub-title.component';
import { MatCardModule } from '@angular/material/card';
import { BtnCancelGComponent } from '../btn-confirm-g/btn-cancel-g.component';
import { BtnDeleteGComponent } from '../btn-delete-g/btn-delete-g.component';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    SubTitleComponent,
    BtnCancelGComponent,
    BtnDeleteGComponent
  ],
  template: `

  <sub-title title [title]="'Deletar?'" [icon]="'add'"></sub-title>
  <div fxLayout="row" fxLayoutGap="30px">
      <div fxLayout="column">
          <h2 mat-dialog-title>{{title}}</h2>
      </div>
  </div>
  <mat-dialog-content>
      {{messageBody}}
  </mat-dialog-content>
  <div fxLayout="row" fxLayoutAlign="space-between stretch" style="margin-top:30px;">
  <btn-cancel-g></btn-cancel-g>
  <btn-delete-g></btn-delete-g>
      <!-- <button mat-dialog-close mat-button style="background-color: rgb(38, 187, 38); color: white;" (click)="clickedYes(btn1)">{{btn1}}</button>
      <button mat-button mat-dialog-close style="background-color: rgb(24, 121, 24); color: white; " (click)="clickedNo(btn2)">{{btn2}}</button> -->
  </div>

`,
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
export class DeleteDialogComponent implements OnInit {

  // @Input() public first: string;
  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;

  constructor(
    private _DialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private _SnackBar: MsgOperation

  ) {
    this.title = this.data.title;
    this.messageBody = this.data.messageBody;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
  }

  clickedYes(yes: string) {
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }

  ngOnInit(): void {
  }

}
