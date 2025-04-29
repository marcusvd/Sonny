import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CaptchaComponent } from '../captcha/captcha.component';
import { MyUser } from '../dto/my-user';
import { ResetPassword } from '../dto/reset-password';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [
    
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SubTitleComponent,
    CaptchaComponent
  ],
})

export class ResetPasswordComponent implements OnInit {

  formMain: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService,
    private _fb: FormBuilder
  ) { }

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }

  register(tokenCaptcha:string) {

    const resetPassword: ResetPassword = this.formMain.value;

    if (this.formMain.valid && tokenCaptcha) {
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

  formLoad(param: any) {
    this.formMain = this._fb.group({
      token: [param['token'], [Validators.required]],
      email: [param['email'], [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })

    return this.formMain;
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(param => {
      this.formLoad(param);
    }
    );
  }

}
