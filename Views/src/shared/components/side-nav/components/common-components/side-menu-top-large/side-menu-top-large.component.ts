import { NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'side-menu-top-large',
  templateUrl: './side-menu-top-large.component.html',
  styleUrls: ['./side-menu-top-large.component.css'],
  standalone: true,
  imports: [NgIf, MaterialModule, UpperCasePipe, RouterLink, TitleCasePipe]
})
export class SideMenuTopLargeComponent implements OnInit {

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
