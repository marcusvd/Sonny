import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { TitleDescriptionAuthComponent } from '../commons-components/title-description-auth.component';
import { MyUser } from '../dto/my-user';
import { AuthenticationService } from '../services/authentication.service';
// import { SubTitleDescriptionAuthComponent } from './sub-title-description-login.component';
import { FooterLoginComponent } from './footer-login.component';
import { error } from 'console';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // SubTitleComponent,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    TitleDescriptionAuthComponent,
    // SubTitleDescriptionAuthComponent,
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
  fxLayoutDirection: string = 'row';
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
      }, error => {
        console.log(error)
      }

      )
    }
  }

  // openDialogRegistering() {
  //   this._auth.openDialogRegistering();
  // }


  // openDialogForgot(): void {

  //   this._auth.openDialogForgot();
  // }

  showHideDescriptionFin: boolean = false;
  showHideDescriptionSto: boolean = false;
  showHideDescriptionSer: boolean = false;
  showHideDescriptionStyleCardFin: string = 'background-color: transparent; box-shadow: none;';
  showHideDescriptionStyleCardSto: string = 'background-color: transparent; box-shadow: none;';
  showHideDescriptionStyleCardSer: string = 'background-color: transparent; box-shadow: none;';
  onMouseOver(value: string) {
    if (value === 'fin') {
      this.showHideDescriptionFin = true;
      this.showHideDescriptionStyleCardFin = 'transition: all 0.5s 0.3s ease-in-out;';
    }
    if (value === 'sto') {
      this.showHideDescriptionSto = true;
      this.showHideDescriptionStyleCardSto = 'transition: all 0.5s 0.3s ease-in-out;';
    }
    if (value === 'ser') {
      this.showHideDescriptionSer = true;
      this.showHideDescriptionStyleCardSer = 'transition: all 0.5s 0.3s ease-in-out;';
    }
  }

  onMouseOut() {

    this.showHideDescriptionFin = false;
    this.showHideDescriptionStyleCardFin = 'transition: all 0.5s 0.3s ease-in-out; background-color: transparent; box-shadow: none;';

    this.showHideDescriptionSto = false;
    this.showHideDescriptionStyleCardSto = 'transition: all 0.5s 0.3s ease-in-out; background-color: transparent; box-shadow: none;';

    this.showHideDescriptionSer = false;
    this.showHideDescriptionStyleCardSer = 'transition: all 0.5s 0.3s ease-in-out; background-color: transparent; box-shadow: none;';

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
