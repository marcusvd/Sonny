import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'auth-warnings',
    templateUrl: './auth-warnings.component.html',
    styles: [
        `
.break {
    word-wrap: break-word;
}
    `
    ],
    standalone: false
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
