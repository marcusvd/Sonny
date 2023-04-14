import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { RetryConfirmEmailComponent } from '../retry-confirm-email/retry-confirm-email.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'dialog-quiz',
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

/* #left {
    display: inline flex;
}

#right {
    display: inline flex;
} */
    `
  ]
})
export class AuthWarningsComponent implements OnInit {

  // @Input() public first: string;
  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;
  //style
  // BgStyle: string;
  // MessageStyle: string;
  // titleStyle:string;
  // btnStyle:string;

  constructor(
    private _DialogRef: MatDialogRef<AuthWarningsComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialog:MatDialog,
    private _auth: AuthenticationService,
    private _SnackBar: MsgOperation,
  ) {
    this.title = this.data.title;
    this.messageBody = this.data.messageBody;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;

    // if (this.data.authentication) {
    //   this.BgStyle = "background-color: white; color:darkgreen; margin:-24px; overflow:hidden;"
    //   this.MessageStyle = "padding-left:40px; padding-right:40px"
    //   this.titleStyle = "float:center;"
    //   this.btnStyle = "padding-bottom:30px;"
    // }
  }

  resendEmailConfim() {
    const dialogRef = this._dialog.open(RetryConfirmEmailComponent, {
      // scrollStrategy: this._overlay.scrollStrategies.noop(),
       width: '450px',
      // height: 'auto',
      // disableClose: true,
      data:''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
      // this.animal = result;
    })
  }

  clickedYes(yes: string) {
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
     this.resendEmailConfim();
  }

  ngOnInit(): void {
  }

}
