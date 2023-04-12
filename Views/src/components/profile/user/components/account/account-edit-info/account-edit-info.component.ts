import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { AccountEditService } from 'src/components/profile/services/account-edit.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'account-edit-info',
  templateUrl: './account-edit-info.component.html',
  styleUrls: ['./account-edit-info.component.css']
})
export class AccountEditInfoComponent extends BaseForm implements OnInit {

  @Input() user: MyUser

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder,
    private _accountEditService: AccountEditService,
    @Inject(MAT_DIALOG_DATA) public data: MyUser
  ) { super(_breakpointObserver) }

  companyUserNameEmailCols: number;
  companyUserNameEmailRowHeight: string = '100px';
  btnChangeTitleRowHeight: string = '40px';
  btnChangeTitleCols: number;


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols = 1;

            break;
          }
          case 'small': {
            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols = 1;
            break;
          }
          case 'medium': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            break;
          }
          case 'large': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            break;
          }
          case 'xlarge': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            break;
          }
        }
      }
    })




  }

  formLoad() {
    //console.log(this.data)
    this.formMain = this._fb.group({
      id: [this.data.id, []],
      userName: [this.data.userName, []],
      email: [this.data.email, []],
      company: this.subForm = this._fb.group({
        id: [this.data.company.id, []],
        name: [this.data.company.name, []],
      })
    })
  }


  updateUser() {
    if (this.alertSave(this.formMain)) {
      this._accountEditService.updateUser(this.formMain);
      // this.formLoad();
    }

  }




  ngOnInit(): void {
    this.screen();
    this.formLoad();
  }

}
