import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

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
