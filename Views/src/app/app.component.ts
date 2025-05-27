import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterModule],
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    // private _auth: AuthenticationService,

  ) {

  }

  ngOnInit(): void {
  //  this._router.navigateByUrl('/')
  //  this._router.navigateByUrl('/customer')
  }


  title = 'Views';

}
