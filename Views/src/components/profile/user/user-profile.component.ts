import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/components/authentication/services/account.service';

import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

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

  constructor(
    private _auth: AuthenticationService,
    private _account: AccountService,
    override _breakpointObserver: BreakpointObserver,

  ) { super(_breakpointObserver) }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.userNameStyle = "font-size: 80px;margin-top: -26px;color: #328131;";
            this.tabGroupStyle = "margin-top:20px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-top: -200px;margin-left: 17px;";
            this.matCardStyle = "padding-top: initial; height: 270px;";
            break;
          }
          case 'small': {
            this.userNameStyle = "font-size: 80px;margin-top: -26px;color: #328131;";
            this.tabGroupStyle = "margin-top:20px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-top: -200px;margin-left: 17px;";
            this.matCardStyle = "padding-top: initial; height: 270px;";
            break;
          }
          case 'medium': {
            this.userNameStyle = "font-size: 80px;margin-top: -93.7px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-top: -200px;margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            break;
          }
          case 'large': {
            this.userNameStyle = "font-size: 80px;margin-top: -93.7px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;"
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-top: -200px;margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            break;
          }
          case 'xlarge': {
            this.userNameStyle = "font-size: 80px;margin-top: -93.7px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-top: -200px;margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            break;
          }
        }
      }
    })




  }

  getUser() {
    this._account.getUserByName('GetUserByNameAsync', 'marcus');
  }

  ngOnInit(): void {
    this.userName = this._auth.currentUser.userName;
    this.screen();
  }

}
