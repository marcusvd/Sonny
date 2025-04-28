import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MyUser } from 'src/components/authentication/dto/my-user';
import { ProfileEditService } from 'src/components/profile/services/profile-edit.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
    selector: 'account-edit-info',
    templateUrl: './account-edit-info.component.html',
    styleUrls: ['./account-edit-info.component.css'],
    standalone: false
})
export class AccountEditInfoComponent extends BaseForm implements OnInit {

  @Input() user: MyUser


  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder,
    private _profileEditService: ProfileEditService,
    @Inject(MAT_DIALOG_DATA) public data: MyUser
  ) { super(_breakpointObserver) }

  companyUserNameEmailCols: number;
  companyUserNameEmailRowHeight: string = '100px';
  btnChangeTitleRowHeight: string = '40px';
  btnChangeTitleCols: number;

  passwordAndConfirmeCols: number = 0;
  passwordAndConfirmeRowHeight: string = '150px'

  //style
  btnSaveStyle: boolean = null;

  private _validatorMessages = ValidatorMessages;

  get validatorMessages() {
    return this._validatorMessages
  }

  private _validatorCustom = ValidatorsCustom;

  get validatorCustom() {
    return this._validatorCustom
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols = 1;
            this.passwordAndConfirmeCols = 1;
            this.btnSaveStyle = true;
            break;
          }
          case 'small': {
            this.companyUserNameEmailCols = 1;
            this.btnChangeTitleCols = 1;
            this.passwordAndConfirmeCols = 1;
            this.btnSaveStyle = true;
            break;
          }
          case 'medium': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            this.passwordAndConfirmeCols = 3;
            this.btnSaveStyle = false;
            break;
          }
          case 'large': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            this.passwordAndConfirmeCols = 3;
            this.btnSaveStyle = false;
            break;
          }
          case 'xlarge': {
            this.companyUserNameEmailCols = 3;
            this.btnChangeTitleCols = 2;
            this.passwordAndConfirmeCols = 3;
            this.btnSaveStyle = false;
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
      password: ['**********', []],
      confirmPassword: ['**********', []],
      email: [this.data.email, []],
      company: this.subForm = this._fb.group({
        id: [this.data.company.id, []],
        name: [this.data.company.name, []],
      })
    })
  }


  updateUser() {
    if (this.alertSave(this.formMain)) {
      const user: MyUser = { ...this.formMain.value }

      this._profileEditService.updateUser(user);
      //  this.formLoad();
    }

  }




  ngOnInit(): void {
    this.screen();

    this.formLoad();
  }

}
