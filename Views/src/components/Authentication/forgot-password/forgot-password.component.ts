import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CaptchaComponent } from '../captcha/captcha.component';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';
import { ForgotPassword } from '../dto/forgot-password';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CaptchaComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    FlexLayoutModule,
    NgIf,
    TitleDescriptionAuthComponent

  ],
  providers: [CaptchaComponent]
})
export class ForgotPasswordComponent extends BaseForm implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private _validatorMessages = ValidatorMessages;
  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;
  get validatorCustom() {
    return this._validatorCustom
  }


  recovery(tokenCaptcha: string) {
    if (this.formMain.controls['email'].valid && tokenCaptcha) {
      // console.log(captcha)
      const forgotMyPassword: ForgotPassword = this.formMain.value;
      this._auth.forgotMyPassword(forgotMyPassword);
    }
  }

  formLoad() {
    return this.formMain = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  back() {
    window.history.back();
  }
  ngOnInit(): void {
    this.formLoad();
  }

}
