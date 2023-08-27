import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


import { map } from "rxjs/operators";
import { MyUser } from "src/components/authentication/dto/myUser";
import { AccountService } from "src/components/authentication/services/account.service";
import { AuthenticationService } from "src/components/authentication/services/authentication.service";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";


@Injectable()
export class ProfileLoadResolver implements Resolve<Observable<MyUser>> {
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
