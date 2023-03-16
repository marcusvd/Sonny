import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';



// import { RegisterComponent } from '../../register/register.component';
// import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
// import { RetryConfirmEmailComponent } from '../../retry-confirm-email/retry-confirm-email.component';
// import { TwoFactorComponent } from '../../two-factor/two-factor.component';
// import { ProfileComponent } from '../../profile/profile.component';
// import { FirstComponent } from 'src/app/core/shared/components/first/first.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'confirm-email', component: ConfirmEmailComponent },
  //  {redirectTo: 'side-nav', component:SideNavComponent}
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
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
