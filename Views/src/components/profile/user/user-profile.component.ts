import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { AccountService } from 'src/components/authentication/services/account.service';

import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { environment } from 'src/environments/environment';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { AccountEditInfoComponent } from './components/account/account-edit-info/account-edit-info.component';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { AddressDto } from 'src/shared/dtos/address-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactDto } from 'src/shared/dtos/contact-dto';
import { ProfileEditService } from '../services/profile-edit.service';
import { ContactV2Service } from 'src/shared/components/contact/services/contact-v2.service';
import { ActivatedRoute } from '@angular/router';
import { AddressV2Service } from 'src/shared/components/address/services/address-v2.service';
;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseForm implements OnInit {
  userName: string;
  imageStyle: string;
  userNameStyle: string;
  tabGroupStyle: string;
  imageSettingsStyle: string;
  matCardStyle: string;
  borderAround: string;

  fxLayoutCenterBtnUpdate: string;
  fxLayoutCenterBtnUpdateBelow: string;

  constructor(
    private _auth: AuthenticationService,
    private _account: AccountService,
    private _addressService: AddressV2Service,
    private _contactService: ContactV2Service,
    override _breakpointObserver: BreakpointObserver,
    private _profileEditService: ProfileEditService,
    private _activatedRoute: ActivatedRoute,
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

            this.imageUsernameRowHeight = '250px';
            this.fxLayoutCenterBtnUpdate = 'center center';

            this.imageUsernameCols = 1;
            this.imageColsSpan = 1;
            // this.btnUpdatePositionAboveBelow = true;
            break;

          }
          // btnUpdatePositionAboveBelow
          case 'small': {
            this.userNameStyle = "font-size: 80px;margin-top: -150px;color: #328131;";
            this.tabGroupStyle = "margin-top:-120px;";
            this.imageSettingsStyle = " width: 520px;height: 300px;margin-top: 100px; margin-left: 17px;";
            this.matCardStyle = "padding-top: initial;height: 850px;";
            this.borderAround = "padding-left: initial; padding-right: initial;";

            this.imageUsernameRowHeight = '250px';
            this.fxLayoutCenterBtnUpdate = 'center center';

            this.imageUsernameCols = 1;
            this.imageColsSpan = 1;
            // this.btnUpdatePositionAboveBelow = true;
            break;

          }
          case 'medium': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";

            this.imageUsernameRowHeight = '250px';
            this.fxLayoutCenterBtnUpdate = 'center center';

            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            // this.fxLayoutCenterBtnUpdateBelow = 'center center';
            // this.btnUpdatePositionAboveBelow = false;
            break;

          }
          case 'large': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;"
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";

            this.imageUsernameRowHeight = '250px';
            this.fxLayoutCenterBtnUpdate = 'end end';

            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            // this.fxLayoutCenterBtnUpdateBelow = 'center center';
            // this.btnUpdatePositionAboveBelow = false;
            break;

          }
          case 'xlarge': {
            this.userNameStyle = "font-size: 80px;margin-left: 280px;color: #328131;";
            this.tabGroupStyle = "  margin-top: -48px;";
            this.imageSettingsStyle = " width: 520px;height: 220px; margin-left: 50px;";
            this.matCardStyle = "padding-top: initial; height: 250px;";
            this.borderAround = "padding-left: 100px; padding-right: 100px; padding-top: 30px;";

            this.imageUsernameRowHeight = '250px';
            this.fxLayoutCenterBtnUpdate = 'end end';
            this.imageUsernameCols = 3;
            this.imageColsSpan = 2;
            // this.fxLayoutCenterBtnUpdateBelow = 'center center';
            // this.btnUpdatePositionAboveBelow = false;
            break;

          }
        }
      }
    })




  }

  public user: MyUser;

  getUser() {
    this._account.getUserByName('GetUserByNameAllIncludedAsync', this._auth.currentUser.userName).subscribe({
      next: (user: MyUser) => {
        this.user = user;
        // this.formLoad(user)
        //console.log(user)
      },
      error: (err: any) => {
        console.log(err)
      }

    })
  }

  updateTab: number = null;
  update() {

    this.user.address = { ...this._addressService.formMain.value };
    this.user.contact = { ...this._contactService.formMain.value };

    if (this.updateTab == 1) {
      if (!this.alertSave(this._addressService.formMain)) {
        this.Update();
      }
      else {
        this._addressService.formMain.markAllAsTouched();
       }
    }

    if (this.updateTab == 2) {
      if (!this.alertSave(this._contactService.formMain)) {
        this.Update();
      }
      else {
        this._contactService.formMain.markAllAsTouched();
       }
    }
  }

  Update() {
    this._profileEditService.updateUserV2(this.user);
    this.getUser();
  }

  tabIndexSelected($event: any) {
    this.toHideUpdateButton($event.index);
    this.updateMethod($event.index)
  }

  updateMethod(indexTab: number) {
    this.updateTab = indexTab;
  }

  updateBtnHide: boolean = false;
  toHideUpdateButton(tabIndex?: number) {
    if (tabIndex == 0) {
      this.updateBtnHide = false
    }
    else {
      this.updateBtnHide = true
    }
  }

  ngOnInit(): void {
    this.userName = this._auth.currentUser.userName;
    this.screen();

    this._activatedRoute.data.subscribe((obj: any) => {
      this.user = obj.loaded as MyUser;
    })

    this._contactService.formLoaded(this.user?.contact)
    this._addressService.formLoaded(this.user?.address)
  }

}
