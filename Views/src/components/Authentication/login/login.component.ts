import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { Login } from '../dto/login';
import { MyUser } from '../dto/my-user';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';
import { AuthenticationService } from '../services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SubTitleComponent,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule

  ]
})
export class LoginComponent extends BaseForm implements OnInit {




  constructor(
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }
  override formMain: FormGroup;

  spaceLogoTitle:string;

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
            this.spaceLogoTitle = "20"
            break;
          }
          case 'small': {
            this.spaceLogoTitle = "20"
            break;
          }
          case 'medium': {
              this.spaceLogoTitle = "10"
            break;
          }
          case 'large': {
              this.spaceLogoTitle = "5"
            break;
          }
          case 'xlarge': {
              this.spaceLogoTitle = "5"
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

  openDialogRegistering() {
    this._auth.openDialogRegistering();
  }


  openDialogForgot(): void {

    this._auth.openDialogForgot();
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
