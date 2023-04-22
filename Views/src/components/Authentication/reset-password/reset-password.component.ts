import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyUser } from '../dto/myUser';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../dto/reset-password';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  formMain: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService,
  ) { }


  ngAfterViewInit(): void {
    this.formLoad();
  }

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }


  register() {

    const resetPassword: ResetPassword = this.formMain.value;

    if (this.formMain.value) {
      const user: MyUser = this.formMain.value;
      this._activatedRoute.queryParams.subscribe(param => {
        resetPassword.token = param['token'],
          resetPassword.email = param['email'],
          resetPassword.password = user.password,
          resetPassword.confirmPassword = user.confirmPassword
          this._auth.reset(resetPassword);
      }
      );
    }

  }

  formLoad() {

    const form = new FormGroup({
      token: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
    // },this._validatorCustom.fieldCompare('password','confirmPassword'))

    this.formMain = form;

    return this.formMain;
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
