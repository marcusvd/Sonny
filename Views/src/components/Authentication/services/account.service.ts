import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})

export class AccountService extends BackEndService<MyUser> {


  // private currentUserSubject: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem("myUser")));
  // public currentUser: UserToken;


  constructor(
    override _http: HttpClient,
    // private _userManger:UserMan
    // private _router: Router,
    // private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._ACCOUNT)
    // this.currentUserSubject?.next(JSON.parse(localStorage.getItem("myUser")))
    // this.currentUser = this.currentUserSubject?.value
  }

  getUserByName(url: string, name: string) {
    return this.loadByName$<MyUser>(url, name);
  }

  // getUserById(url: string, id: number) {
  //   return this.loadByName$<MyUser>(url, id);
  // }





}
