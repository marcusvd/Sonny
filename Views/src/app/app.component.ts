import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,

  ) {

  }

  ngOnInit(): void {

  }


  title = 'Views';

}
