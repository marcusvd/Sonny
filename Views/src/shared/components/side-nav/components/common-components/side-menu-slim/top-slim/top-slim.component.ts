import { CommonModule, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';


@Component({
  selector: 'top-slim',
  templateUrl: './top-slim.component.html',
  styleUrls: ['./top-slim.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
     UpperCasePipe,
     TitleCasePipe
    ]
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
