import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";


import { AuthenticationService } from "src/components/authentication/services/authentication.service";

@Injectable()
export class UserIsAuthenticatedGuard  {

  constructor(
    private _router: Router,
    private _auth: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.currentUser?.authenticated) {
      return true;
    }
    this._router.navigate(['/first']);
      return false;
  }
}
