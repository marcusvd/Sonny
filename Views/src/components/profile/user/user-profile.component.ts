import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';


import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ProfileEditService } from '../services/profile-edit.service';
import { MyUser } from 'src/components/authentication/dto/my-user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone:true,
  imports:[
    CommonModule,
     
     ReactiveFormsModule,
     MatFormFieldModule,
     MatCardModule,
     MatTabsModule,
     ContactComponent,
     AddressComponent,
     MatDividerModule
    ]
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
    // private _account: AccountService,
    private _addressServices: AddressService,
    override _breakpointObserver: BreakpointObserver,
    private _profileEditService: ProfileEditService,
    private _activatedRoute: ActivatedRoute,
    private _contactService: ContactService,
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
    // this._account.getUserByName('GetUserByNameAllIncludedAsync', this._auth.currentUser.userName).subscribe({
    //   next: (user: MyUser) => {
    //     this.user = user;
    //   },
    //   error: (err: any) => {
    //     console.log(err)
    //   }

    // })
  }

  updateTab: number = null;
  update() {

    if (this.updateTab == 2) {

      // this.formMain =   this._contactService.formMainLocal;
      this.user.contact = { ...this._contactService.formMain.value };

      if (!this._contactService.formMain.valid) {
        console.log(this._contactService.formMain)
        this._contactService.formMain.setErrors({ required: true })
        this._contactService.formMain.markAllAsTouched();
        alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')

        return false;
      }
      this.UpdateAction();
      return true;

    }

    return false;
  }


  UpdateAction() {
    this._profileEditService.updateUser(this.user);
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


  handleUserName(){
    return this.user.userName.substring(0,5).toUpperCase()
    }


  addressFormMain: FormGroup
  contactFormMain: FormGroup
  ngOnInit(): void {
    this.userName = this._auth.currentUser.userName;
    this.screen();

    this._activatedRoute.data.subscribe((obj: any) => {
      this.user = obj.loaded as MyUser;
    })
    this.addressFormMain =this._addressServices.formLoad(this.user.address)
    this.contactFormMain =this._contactService.formLoad(this.user.contact)
  }

}
