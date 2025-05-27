
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

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

    NgIf,
    TitleDescriptionAuthComponent

  ],
  providers: [CaptchaComponent]
})
export class ForgotPasswordComponent extends BaseForm implements OnInit {

  constructor(
    private _auth: AuthenticationService,

  ) {
    super()
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
