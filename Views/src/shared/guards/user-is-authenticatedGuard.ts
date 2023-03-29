import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "src/components/authentication/services/authentication.service";

@Injectable()
export class UserIsAuthenticatedGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const currentUser = this._authenticationService.currentUser

    console.log("AQUI O TESTE", currentUser)

    if (currentUser?.authenticated) {
     // this.router.navigate(['/side-nav']);
      return true;
    }

    //this.router.navigateByUrl('/side-nav/first');
    return false;
  }

}
