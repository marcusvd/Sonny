import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from '../dto/myUser';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { ValidatorsMessagesAuthentication } from '../validators/validators-messages-authentication';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseForm implements OnInit {

  // formMain: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  // ngAfterViewInit(): void {
  //   this.formLoad();
  // }

  private _validatorsMessagesAuthentication = ValidatorsMessagesAuthentication;

  get validatorsMessagesAuthentication() {
    return this._validatorsMessagesAuthentication
  }
  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }

  // openDialogLogin(): void {
  //   const dialogRef = this._dialog.open(LoginComponent, {
  //     width: '250px',

  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('the dialog was closed');
  //     this.animal = result;
  //   })
  // }

  openDialogLogin() {
    this._auth.openDialogLogin()
  }

  public loginErrorMessage: string = null;
  public blockBtnRegister: boolean = false;
  register(tokenCaptcha: string) {
    if (!this.blockBtnRegister) {
      this.blockBtnRegister = true;
      const user: MyUser = this.formMain.value;
      if (this.alertSave(this.formMain)) {
        if (this.formMain.valid && tokenCaptcha) {

          this._auth.register(user, this.formMain).subscribe((x: string) => {
            this.loginErrorMessage = x;

          })
        }

      }
    }
  }

  formLoad() {
    return this.formMain = this._fb.group({
      company: this.formCompany(),
      userName: ['Incompleto', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  formCompany() {
    return this.subForm = this._fb.group({
      name: ['Incompleto', [Validators.required]]
    })

  }


  ngOnInit(): void {
    this.formLoad();
  }

}
