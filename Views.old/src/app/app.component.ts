import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    // private _auth: AuthenticationService,

  ) {

  }

  ngOnInit(): void {
  //  this._router.navigateByUrl('side-nav/login')
  }


  title = 'Views';

}
