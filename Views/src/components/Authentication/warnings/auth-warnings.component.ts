import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { RetryConfirmEmailComponent } from '../retry-confirm-email/retry-confirm-email.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'auth-warnings',
  template: `
  <div class="break" >
  <div fxLayout="row" fxLayoutGap="30px" fxLayoutAlign="center center">
      <div fxLayout="column" >
          <h2 mat-dialog-title  >{{title}}</h2>
      </div>
  </div>
  <mat-dialog-content class="break" >
      {{messageBody}}
  </mat-dialog-content>
  <div fxLayout="row" fxLayoutAlign="space-between stretch" style="margin-top:30px;" fxLayoutAlign="center center" >
      <button mat-dialog-close mat-button style="background-color: rgb(38, 187, 38); color: white;" (click)="clickedYes(btn1)" *ngIf="btn1">{{btn1}}</button>
      <button mat-button mat-dialog-close style="background-color: rgb(24, 121, 24); color: white; " (click)="clickedNo(btn2)" *ngIf="btn2">{{btn2}}</button>
  </div>
</div>
`,
  styles: [
    `
.break {
    word-wrap: break-word;
}
    `
  ]
})
export class AuthWarningsComponent implements OnInit {
  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;

  constructor(
    private _DialogRef: MatDialogRef<AuthWarningsComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private _auth: AuthenticationService,
  ) {
    console.log(this.data)
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
    this._auth.resendEmailConfim();
  }

  ngOnInit(): void {
  }

}
