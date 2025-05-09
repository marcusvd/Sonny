import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "src/components/authentication/services/account.service";



import { MyUser } from 'src/components/authentication/dto/my-user';
import { AuthenticationService } from "src/components/authentication/services/authentication.service";



@Injectable()
export class ProfileLoadResolver  {
  constructor(
    private _account: AccountService,
    private _auth: AuthenticationService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MyUser> {

    const myUser: Observable<MyUser> =  this._account.getUserByName('GetUserByNameAllIncludedAsync', this._auth.currentUser.userName);


      return myUser;
  }
}
