import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { CommunicationAlerts } from 'src/shared/services/messages/snack-bar.service';
import { ConfirmEmail } from '../dto/confirm-email';
import { ForgotPassword } from '../dto/forgot-password';
import { MyUser } from '../dto/myUser';
import { ResetPassword } from '../dto/reset-password';
import { RetryConfirmPassword } from '../dto/retry-confirm-password';
import { T2Factor } from '../dto/t2-factor';
import { UserToken } from '../dto/user-token';
import { MatDialog } from '@angular/material/dialog';
import { DialogQuizComponent } from 'src/shared/components/dialog-quiz/dialog-quiz.component';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends BackEndService<MyUser, number> {

  private currentUserSubject: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem("myUser")));
  public currentUser: UserToken;
  // scrollStrategy: ScrollStrategy;
  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);


  constructor(
    override _http: HttpClient,
    private _router: Router,
    private _dialog: MatDialog,
    private _communicationsAlerts: CommunicationAlerts,
    // private readonly scrollStrategyOptions: ScrollStrategyOptions,
  ) {
    super(_http, environment.auth)
    this.currentUserSubject?.next(JSON.parse(localStorage.getItem("myUser")))
    this.currentUser = this.currentUserSubject?.value

    // this.scrollStrategy = this.scrollStrategyOptions.noop();
  }

  register(user: MyUser) {
    return this.add$<MyUser>(user, 'register').pipe(take(1))
      .subscribe({
        next: (user: MyUser) => {
          //console.log(user)
          this._communicationsAlerts.communication('', 6, 2, 'top', 'center');
          //  this._router.navigateByUrl('/login');
        }, error: (err: any) => {
          console.log(err)
          this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        }
      })
  }

  login(user: MyUser) {

    this.add$<MyUser>(user, 'login').subscribe({
      next: (user: MyUser) => {

        this.currentUserSubject.next(user);
        this.currentUser = user;

        if (user.authenticated) {
          // this._errorMessage.complete();
          // this._errorMessage.next(null);
          if (user.action == "TwoFactor") {

            this._router.navigateByUrl('two-factor');

          }

          this.setItemLocalStorage(user);

          this._router.navigateByUrl('side-nav');

          this._communicationsAlerts.communication('', 4, 2, 'top', 'center');

          this._dialog.closeAll();
        }
        else {
          console.log('Usuário não autenticado');
        }

      }, error: (err: any) => {
        const erroCode: string = err.error.Message.split('|');
        switch (erroCode[0]) {
          case '1.4': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'delay': '3',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            this._errorMessage.next(erroCode[1])
            break;
          }
          case '1.11': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'delay': '3',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            this.openAuthWarnings({ btn1: 'Fechar', btn2: '', messageBody: erroCode[1] })
            break;
          }

        }

      }

    })
    return this._errorMessage;
  }

  openAuthWarnings(errorMessage: any) {

    const btn1: string = errorMessage.btn1;
    const btn2: string = errorMessage.btn2;
    const messageBody: string = errorMessage.messageBody;

    const dialogRef = this._dialog.open(AuthWarningsComponent, {
      width: '250px',
      height: 'auto',
      disableClose: true,
      data: {
        title: 'Erro de autenticação',
        messageBody: messageBody,
        btn1: btn1,
        btn2: btn2,
        // authentication: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    })


  }
  openDialogLogin(): void {
    // this._errorMessage = new BehaviorSubject<string>(null);
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '350px',
      // height: '490px',
      // minHeight: '490px',
      // maxHeight: '490px',
      height: 'auto',
      data: { error: this._errorMessage },
      autoFocus: true,
      // scrollStrategy: this.scrollStrategy
    });

    dialogRef.afterClosed().subscribe(result => {
      this._errorMessage.next('');
    })
  }
  openDialogRegistering(): void {
    const dialogRef = this._dialog.open(RegisterComponent, {
      // scrollStrategy: this._overlay.scrollStrategies.noop(),
      // width: '250px',
      // height: 'auto',
      // data: {}
      width: '350px',
      height: 'auto',
      // minHeight: '490px',
      // maxHeight: '490px',
      data: { error: this._errorMessage },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }
  openDialogForgot(): void {
    const dialogRef = this._dialog.open(ForgotPasswordComponent, {
      width: 'auto',
      height: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('the dialog was closed');

    })
  }

  public get isAuthenticated(): boolean {

    // if (this.currentUserSubject) {
    //   this.logOut();
    //   return false;
    // }

    // if (new Date().getTime() > (new Date(this.currentUserSubject?.value?.expiration).getTime())) {
    //   this.logOut();
    //   return false;
    // }

    // if (this.currentUserSubject?.value?.authenticated) {
    //   return true;

    // }
    // else {
    //   return false
    // }
    return false;
  }

  setItemLocalStorage(user: MyUser) {
    localStorage.setItem("myUser", JSON.stringify(user));
  }

  logOut() {
    this._router.navigateByUrl('/first')
    // this.openDialogLogin();
    localStorage.clear();
    this._communicationsAlerts.communication('', 5, 2, 'top', 'center');
    this.currentUserSubject.complete();
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  forgotMyPassword(forgotPassword: ForgotPassword) {
    return this.add$<ForgotPassword>(forgotPassword, 'forgotpassword').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Recuperação de senha.', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
      }
    })
  }

  twoFactor(t2factor: T2Factor) {

    return this.add$<T2Factor>(t2factor, 'twoFactor').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Autenticação de dois fatores.', 'Sucesso!');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Token Inválido ou expirado.', 'Falha');
      }
    })



  }

  confirmEmail(confirmEmail: ConfirmEmail) {
    return this.add$<ConfirmEmail>(confirmEmail, 'confirmEmailAddress').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Recuperação de senha.', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
      }
    })

  }

  retryConfirmEmailGenerateNewToken(retryConfirmPassword: RetryConfirmPassword) {
    return this.add$<RetryConfirmPassword>(retryConfirmPassword, 'RetryConfirmEmailGenerateNewToken').pipe(take(1)).subscribe({
      next: () => {
        this._dialog.closeAll();
        setTimeout(() => {
          this.openDialogLogin()
        }, 3000);
        //this._toastr.success('Confirmação de email...', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
      }
    })
  }

  reset(resetPassword: ResetPassword) {
    return this.add$(resetPassword, 'reset').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Recuperação de senha.', 'Com Sucesso!!!');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Tente novamente mais tarde, obrigado!', 'Falha');
      }
    })
  }
}
