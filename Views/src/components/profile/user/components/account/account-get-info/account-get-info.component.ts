import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { MyUser } from 'src/components/authentication/dto/my-user';
import { ProfileEditService } from 'src/components/profile/services/profile-edit.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

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
    override _breakpointObserver: BreakpointObserver,
    private _profileEditService: ProfileEditService,

  ) { super(_breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column";

            break;
          }
          case 'small': {


            this.screenFieldPosition = "column";
            break;
          }
          case 'medium': {


            this.screenFieldPosition = "row";
            break;
          }
          case 'large': {

            this.screenFieldPosition = "row";


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row";


            break;
          }
        }
      }
    })




  }

  edit() {
    // console.log(this.user)
    this._profileEditService.openDialogAccountInfoEdit(this.user);
  }





  ngOnInit(): void {
    this.screen();
  }

}
