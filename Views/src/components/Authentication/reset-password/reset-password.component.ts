import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from '../dto/my-user';
import { ResetPassword } from '../dto/reset-password';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CaptchaComponent } from '../captcha/captcha.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDivider, MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [
    FlexLayoutModule,
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
    // this._activatedRoute.queryParams.subscribe(param => {
    //   resetPassword.token = param['token'],
    //     resetPassword.email = param['email'],
    //     resetPassword.password = user.password,
    //     resetPassword.confirmPassword = user.confirmPassword
    //   this._auth.reset(resetPassword);
    // }
    // );

    this.formLoad();
  }

}
