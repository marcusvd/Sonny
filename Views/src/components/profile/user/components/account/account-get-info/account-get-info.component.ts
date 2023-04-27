import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyUser } from 'src/components/authentication/dto/myUser';
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
  companyUserNameEmailCols: number;
  companyUserNameEmailRowHeight: string = '150px';
  btnChangeTitleRowHeight: string = '40px';
  btnChangeTitleCols:number;


  constructor(
    override _breakpointObserver: BreakpointObserver,
    private  _profileEditService: ProfileEditService,

    ) { super(_breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols =1;


            break;
          }
          case 'small': {


            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols =1;
            break;
          }
          case 'medium': {


            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols =2;
            break;
          }
          case 'large': {

            this.btnChangeTitleCols =2;
            this.companyUserNameEmailCols = 3;


            break;
          }
          case 'xlarge': {
            this.btnChangeTitleCols =2;
            this.companyUserNameEmailCols = 3;



            break;
          }
        }
      }
    })




  }

  edit(){
    // console.log(this.user)
    this._profileEditService.openDialogAccountInfoEdit(this.user);
  }

  ngOnInit(): void {
    this.screen();
  }

}
