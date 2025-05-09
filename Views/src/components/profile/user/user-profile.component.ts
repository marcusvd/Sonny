
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';


import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

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

    private _profileEditService: ProfileEditService,
    private _activatedRoute: ActivatedRoute,
    private _contactService: ContactService,
  ) {super()}

  imageUsernameCols: number;
  imageColsSpan: number;
  imageUsernameRowHeight: string;

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


    this._activatedRoute.data.subscribe((obj: any) => {
      this.user = obj.loaded as MyUser;
    })
    this.addressFormMain =this._addressServices.formLoad(this.user.address)
    this.contactFormMain =this._contactService.formLoad(this.user.contact)
  }

}
