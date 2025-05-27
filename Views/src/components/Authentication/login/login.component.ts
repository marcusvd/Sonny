
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';



import { CommonModule } from '@angular/common';

import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';
import { MyUser } from '../dto/my-user';
import { AuthenticationService } from '../services/authentication.service';
import { FooterLoginComponent } from './footer-login.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    BtnGComponent,
    TitleDescriptionAuthComponent,
    FooterLoginComponent
  ]
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,

  ) {super()}
  override formMain: FormGroup;

  spaceLogoTitle: string;
  fxLayoutDirection:string='row';
  private _validatorMessages = ValidatorMessages;
  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;
  get validatorCustom() {
    return this._validatorCustom
  }


  public loginErrorMessage: string = null;
  login() {

    const login: MyUser = this.formMain.value;
    this.loginErrorMessage = null;
    this.loginErrorMessage = '';
    if (this.alertSave(this.formMain)) {
      this._auth.login(login).subscribe((x: string) => {

        this.loginErrorMessage = x;
      })
    }
  }

  formLoad() {
    return this.formMain = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loginErrorMessage = null;
    this.loginErrorMessage = '';
    this.formLoad();


  }

}
