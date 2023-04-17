import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CompanyDto } from 'src/shared/components/table-g/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { Login } from '../dto/login';
import { MyUser } from '../dto/myUser';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseForm implements OnInit {


  public loginErrorMessage: string = null;

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public message: any
    // private _overlay: Overlay
  ) { super(_breakpointObserver) }
  override formMain: FormGroup;


  // ngAfterViewInit(): void {
  //   this.formLoad();
  // }

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }


  login() {

    const login: MyUser = this.formMain.value;
    if (this.alertSave(this.formMain)) {
      this._auth.login(login).subscribe((x: string) => {
        this.loginErrorMessage = x;
      })
    }
  }

  openDialogRegistering(): void {
    const dialogRef = this._dialog.open(RegisterComponent, {
      // scrollStrategy: this._overlay.scrollStrategies.noop(),
      width: '250px',
      height: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');

    })
  }


  openDialogForgot(): void {
    const dialogRef = this._dialog.open(ForgotPasswordComponent, {
      width: '250px',

      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('the dialog was closed');

    })
  }



  formLoad() {
    return this.formMain = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.formLoad();

  }
}
