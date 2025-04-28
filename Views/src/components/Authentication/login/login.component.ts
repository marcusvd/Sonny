import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';



import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { RouterModule } from '@angular/router';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';
import { MyUser } from '../dto/my-user';
import { AuthenticationService } from '../services/authentication.service';
import { FooterLoginComponent } from './footer-login.component';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatIconModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        RouterModule,
        TitleDescriptionAuthComponent,
        FooterLoginComponent
    ]
})
export class LoginComponent extends BaseForm implements OnInit {

  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }
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

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.spaceLogoTitle = "13"
            this.fxLayoutDirection = 'row'
            break;
          }
          case 'small': {
            this.spaceLogoTitle = "13"
            this.fxLayoutDirection = 'row'
            break;
          }
          case 'medium': {
            this.spaceLogoTitle = "4"
            this.fxLayoutDirection = 'row'
            break;
          }
          case 'large': {
            this.spaceLogoTitle = "4"
            this.fxLayoutDirection = 'row'
            break;
          }
          case 'xlarge': {
            this.spaceLogoTitle = "4"
            this.fxLayoutDirection = 'row'
            break;
          }
        }
      }
    })
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
    this.screen();

  }

}
