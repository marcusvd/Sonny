import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { FirstComponent } from 'src/shared/components/first/components/first.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'first', component: FirstComponent}

  //  {redirectTo: 'side-nav', component:SideNavComponent}
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'retry-confirm-email', component: RetryConfirmEmailComponent },
  // { path: 'two-factor', component: TwoFactorComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'first', component: FirstComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
