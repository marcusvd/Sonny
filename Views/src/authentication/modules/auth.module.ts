import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
// import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
// import { CaptchaComponent } from '../captcha/captcha.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RetryConfirmEmailComponent } from '../retry-confirm-email/retry-confirm-email.component';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';

// import { ConfirmEmailComponent } from '../../confirm-email/confirm-email.component';
// import { RetryConfirmEmailComponent } from '../../retry-confirm-email/retry-confirm-email.component';
// import { TwoFactorComponent } from '../../two-factor/two-factor.component';
// import { ProfileComponent } from '../../profile/profile.component';


@NgModule({
  declarations: [
    // LoginComponent,
    // RegisterComponent,
    // ForgotPasswordComponent,
    AuthWarningsComponent,
    RetryConfirmEmailComponent,
    // CaptchaComponent,
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
    // LoginComponent,
    // RegisterComponent,
    // ForgotPasswordComponent,
    AuthWarningsComponent,
    RetryConfirmEmailComponent,
    // CaptchaComponent,
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
