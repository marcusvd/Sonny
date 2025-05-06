import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';
import { TestsCheksComponent } from '../../stock-product/tests-cheks/tests-cheks.component';


@NgModule({
  declarations: [
    AuthWarningsComponent,
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
    RecaptchaFormsModule,
    TestsCheksComponent
  ],
  exports: [
    AuthWarningsComponent,
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
