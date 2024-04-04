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
<mat-card style="margin-top: -5px;margin-left: -25px; margin-right: -25px;margin-bottom: -25px ">
<sub-title title [title]="'Confirmação de exclusão'" [icon]="'delete_outline'"></sub-title>
  <div fxLayout="row" fxLayoutGap="30px">
    <div fxLayout="column">
      <h2 mat-dialog-title>{{title}}</h2>
      </div>
  </div>
  <mat-dialog-content>
      {{messageBody}}
  </mat-dialog-content>
  <div fxLayout="row"  style="margin-top:30px;" fxLayoutGap="30px">
  <div fxLayout="column" fxFlex>

</div>
  <div fxLayout="column">
  <btn-cancel-g></btn-cancel-g>
</div>
  <div fxLayout="column">
  <btn-delete-g></btn-delete-g>
</div>


  </div>
  <!-- <div fxLayout="row" fxLayoutAlign="space-between stretch" style="margin-top:30px;">
    <btn-cancel-g></btn-cancel-g>
    <btn-delete-g></btn-delete-g>
  </div> -->

</mat-card>
`,
  styles: [
    `

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
