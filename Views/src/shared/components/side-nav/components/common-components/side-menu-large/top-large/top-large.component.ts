import { CommonModule, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu as MatMenu, MatMenuModule as MatMenuModule, MatMenuTrigger as MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'top-large',
  templateUrl: './top-large.component.html',
  styleUrls: ['./top-large.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    RouterLink,
    UpperCasePipe,
    TitleCasePipe
  ]
})
export class SideMenuTopLargeComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { }


  userName: string;
  firstLetter: string;
  imgProfile: string;

  logOut() {
    this._auth.logOut();
  }




  ngOnInit(): void {
    this.firstLetter = this._auth.currentUser.userName[0];
    this.userName = this._auth.currentUser.userName;
    this.imgProfile = this._auth.currentUser.imgProfile;
  }
}
