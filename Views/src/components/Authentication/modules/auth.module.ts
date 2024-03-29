import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { RegisterComponent } from '../register/register.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { LoginComponent } from '../login/login.component';
// import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';
import { RetryConfirmEmailComponent } from '../retry-confirm-email/retry-confirm-email.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { CaptchaComponent } from '../captcha/captcha.component';
import { CaptchaService } from '../captcha/services/captcha.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

// import { ConfirmEmailComponent } from '../../confirm-email/confirm-email.component';
// import { RetryConfirmEmailComponent } from '../../retry-confirm-email/retry-confirm-email.component';
// import { TwoFactorComponent } from '../../two-factor/two-factor.component';
// import { ProfileComponent } from '../../profile/profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthWarningsComponent,
    RetryConfirmEmailComponent,
    CaptchaComponent,
    ResetPasswordComponent,
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
    //tools-helpers
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthWarningsComponent,
    RetryConfirmEmailComponent,
    CaptchaComponent,
    ResetPasswordComponent,
    // ConfirmEmailComponent,
    // RetryConfirmEmailComponent,
    // TwoFactorComponent,
    // ProfileComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ]
})
export class AuthModule { }
