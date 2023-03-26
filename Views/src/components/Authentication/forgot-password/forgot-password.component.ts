import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ForgotPassword } from '../dto/forgot-password';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseForm implements OnInit {

  // formMain: FormGroup;

  constructor(
    private Auth: AuthenticationService,
    override _breakpointObserver: BreakpointObserver,

  ) {super(_breakpointObserver) }



  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }


  recovery() {

    console.log(this.formMain)

    if (this.formMain.value) {

      const forgotMyPassword: ForgotPassword = this.formMain.value;
      this.Auth.forgotMyPassword(forgotMyPassword);
    }

  }

  formLoad() {

    return this.formMain = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
