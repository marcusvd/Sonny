import { NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'side-menu-top-slim',
  templateUrl: './side-menu-top-slim.component.html',
  styleUrls: ['./side-menu-top-slim.component.css'],
  standalone:true,
  imports:[NgIf, MaterialModule, UpperCasePipe, RouterLink, TitleCasePipe]
})
export class SideMenuTopSlimComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { }

  userName: string;
  imgProfile: string;

  logOut() {
    this._auth.logOut();
  }


  ngOnInit(): void {

    this.userName = this._auth.currentUser.userName;
    this.imgProfile = this._auth.currentUser.imgProfile;
  }
}
