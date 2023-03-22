import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterComponent } from 'src/components/Authentication/register/register.component';
import { AuthenticationService } from 'src/components/Authentication/services/authentication.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: './dialog-login-register',
  templateUrl: './dialog-login-register.component.html',
  styleUrls: ['./dialog-login-register.component.css']

})
export class DialogLoginRegisterComponent extends BaseForm implements OnInit {

  @Input() public first: string;
  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;

  constructor(
    private _DialogRef: MatDialogRef<DialogLoginRegisterComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private _SnackBar: MsgOperation,
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog
  ) {
    super(_breakpointObserver)
    this.title = this.data.title;
    this.messageBody = this.data.messageBody;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
  }
  name;
  animal;

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }

  login() {

  }



  clickedYes(yes: string) {
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  formLoad() {
    return this.formMain = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.formLoad()
  }

}
