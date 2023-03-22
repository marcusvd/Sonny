import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { RegisterComponent } from '../register/register.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { LoginComponent } from '../login/login.component';
import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';
import { DialogLoginRegisterComponent } from '../login-register/components/helper/dialog/dialog-login-register.component';
// import { RegisterComponent } from '../../register/register.component';
// import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
// import { ConfirmEmailComponent } from '../../confirm-email/confirm-email.component';
// import { RetryConfirmEmailComponent } from '../../retry-confirm-email/retry-confirm-email.component';
// import { TwoFactorComponent } from '../../two-factor/two-factor.component';
// import { ProfileComponent } from '../../profile/profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DialogLoginRegisterComponent

    // RegisterComponent,
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
    // ConfirmEmailComponent,
    // RetryConfirmEmailComponent,
    // TwoFactorComponent,
    // ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    //my imports
    SharedModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    DialogLoginRegisterComponent
    // ForgotPasswordComponent,
    // ResetPasswordComponent,
    // ConfirmEmailComponent,
    // RetryConfirmEmailComponent,
    // TwoFactorComponent,
    // ProfileComponent
  ],
  providers:[
    UserIsAuthenticatedGuard
  ]
})
export class AuthModule { }
