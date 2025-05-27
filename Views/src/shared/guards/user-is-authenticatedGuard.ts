import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";


import { AuthenticationService } from "../../components/authentication/services/authentication.service";

@Injectable()
export class UserIsAuthenticatedGuard {

  constructor(
    private _router: Router,
    private _auth: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.currentUser?.authenticated) return this._auth.currentUser?.authenticated;
    else
      this._router.navigate(['/login']);
    return false;
  }
}
