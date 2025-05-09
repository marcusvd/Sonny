
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { MyUser } from 'src/components/authentication/dto/my-user';
import { ProfileEditService } from 'src/components/profile/services/profile-edit.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'account-get-info',
  templateUrl: './account-get-info.component.html',
  styleUrls: ['./account-get-info.component.css']
})
export class AccountGetInfoComponent extends BaseForm implements OnInit {

  @Input() user: MyUser;
  @Input() userForm: FormGroup

  // fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';


  // companyUserNameEmailCols: number;
  // companyUserNameEmailRowHeight: string = '150px';
  // btnChangeTitleRowHeight: string = '40px';
  // btnChangeTitleCols:number;


  constructor(

    private _profileEditService: ProfileEditService,

  ) {super()}

  edit() {
    // console.log(this.user)
    this._profileEditService.openDialogAccountInfoEdit(this.user);
  }





  ngOnInit(): void {

  }

}
