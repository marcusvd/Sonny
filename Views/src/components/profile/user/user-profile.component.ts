import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { AccountService } from 'src/components/authentication/services/account.service';

import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { AccountEditInfoComponent } from './components/account/account-edit-info/account-edit-info.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseForm implements OnInit {
  userName: string;
  // imageUserNameTabsCols:number;
  // imageUserNameTabsrowHeight:string;
  imageStyle: string;
  userNameStyle: string;
  tabGroupStyle: string;
  imageSettingsStyle: string;
  matCardStyle: string;
  borderAround: string;

  constructor(
    private _auth: AuthenticationService,
    private _account: AccountService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  imageUsernameCols: number;
  imageColsSpan: number;
  imageUsernameRowHeight: string;


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.userNameStyle = "font-size: 80px;margin-top: -150px;color: #328131;";
            this.tabGroupStyle = "margin-top:-120px; ";
            this.imageSettingsStyle = " width: 520px;height: 300px;margin-top: 100px; margin-left: 17px;";
            this.matCardStyle = "padding-top: initial; height: 850px;";
            this.borderAround = "padding-left: initial; padding-right: initial;";
            this.imageUsernameCols = 1;
            this.imageColsSpan = 1;

            this.imageUsernameRowHeight = '250px';
            break;

          }
          case 'small': {
            this.userNameStyle = "font-size: 80px;margin-top: -150px;color: #328131;";
            this.tabGroupStyle = "margin-top:-120px;";
            this.imageSettingsStyle = " width: 520px;height: 300px;margin-top: 100px; margin-left: 17px;";
            this.matCardStyle = "padding-top: initial;height: 850px;";
            this.borderAround = "padding-left: initial; padding-right: initial;";
            this.imageUsernameCols = 1;
            this.imageColsSpan = 1;

            this.imageUsernameRowHeight = '250px';
            break;

          }
          case 'medium': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";
            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            this.imageUsernameRowHeight = '250px';
            break;

          }
          case 'large': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;"
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";
            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            this.imageUsernameRowHeight = '250px';
            break;

          }
          case 'xlarge': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";
            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            this.imageUsernameRowHeight = '250px';
            break;

          }
        }
      }
    })




  }

  public user: MyUser;

  getUser() {
    this._account.getUserByName('GetUserByNameAsync', this._auth.currentUser.userName).subscribe({
      next: (user: MyUser) => {
        this.user = user;
        console.log(user)
      },
      error: (err: any) => {
        console.log(err)
      }

    })
  }


  ngOnInit(): void {
    this.userName = this._auth.currentUser.userName;
    this.screen();
    this.getUser();
  }

}
