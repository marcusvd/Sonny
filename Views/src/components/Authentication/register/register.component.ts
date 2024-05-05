import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CaptchaComponent } from '../captcha/captcha.component';
import { MyUser } from '../dto/my-user';
import { AuthenticationService } from '../services/authentication.service';
import { ValidatorsMessagesAuthentication } from '../validators/validators-messages-authentication';
import { CommunicationAlerts } from 'src/shared/services/messages/snack-bar.service';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';


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

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    override _breakpointObserver: BreakpointObserver,
    private _communicationsAlerts: CommunicationAlerts,
  ) { super(_breakpointObserver) }


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

  public loginErrorMessage: string = null;

  register(tokenCaptcha: string) {
      const user: MyUser = this.formMain.value;
      if (this.alertSave(this.formMain)) {
        if (this.formMain.valid && tokenCaptcha) {
          this._auth.register(user, this.formMain).subscribe((x: string) => {
            this.loginErrorMessage = x;
            // this._communicationsAlerts.defaultSnackMsg('7', 0);
            console.log(x)
          })
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
