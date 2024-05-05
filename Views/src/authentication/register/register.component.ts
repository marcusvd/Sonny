import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from '../dto/my-user';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';
import { ValidatorsMessagesAuthentication } from '../validators/validators-messages-authentication';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CaptchaComponent } from '../captcha/captcha.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';
import { CommunicationAlerts } from 'src/shared/services/messages/snack-bar.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    FlexLayoutModule,
    NgIf,
    CaptchaComponent,
    TitleDescriptionAuthComponent
  ]
})
export class RegisterComponent extends BaseForm implements OnInit {

  // formMain: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    override _breakpointObserver: BreakpointObserver,
        private _communicationsAlerts: CommunicationAlerts,
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
    // this._communicationsAlerts.communication('', 5, 2, 'top', 'center');
    // if (!this.blockBtnRegister) {
    //   this.blockBtnRegister = true;
    //   const user: MyUser = this.formMain.value;
    //   if (this.alertSave(this.formMain)) {
    //     if (this.formMain.valid && tokenCaptcha) {

    //       this._auth.register(user, this.formMain).subscribe((x: string) => {
    //         this.loginErrorMessage = x;

    //       })
    //     }

    //   }
    // }
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
      name: ['', [Validators.required]]
    })

  }

  back() {
    window.history.back();
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
