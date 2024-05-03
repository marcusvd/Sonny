import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ForgotPassword } from '../dto/forgot-password';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CaptchaService } from '../captcha/services/captcha.service';
import { CaptchaComponent } from '../captcha/captcha.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecaptchaCommonModule } from 'ng-recaptcha/lib/recaptcha-common.module';

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

  ngOnInit(): void {
    this.formLoad();
  }

}
