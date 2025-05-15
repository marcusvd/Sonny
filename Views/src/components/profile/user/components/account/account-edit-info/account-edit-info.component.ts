
// import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MyUser } from 'src/components/authentication/dto/my-user';
// import { ProfileEditService } from 'src/components/profile/services/profile-edit.service';
// import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

// import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
// import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

// @Component({
//   selector: 'account-edit-info',
//   templateUrl: './account-edit-info.component.html',
//   styleUrls: ['./account-edit-info.component.css']
// })
// export class AccountEditInfoComponent extends BaseForm implements OnInit {

//   @Input() user: MyUser


//   constructor(

//     private _fb: FormBuilder,
//     private _profileEditService: ProfileEditService,
//     @Inject(MAT_DIALOG_DATA) public data: MyUser
//   ) {super()}

//   companyUserNameEmailCols: number;
//   companyUserNameEmailRowHeight: string = '100px';
//   btnChangeTitleRowHeight: string = '40px';
//   btnChangeTitleCols: number;

//   passwordAndConfirmeCols: number = 0;
//   passwordAndConfirmeRowHeight: string = '150px'

//   //style
//   btnSaveStyle: boolean = null;

//   private _validatorMessages = ValidatorMessages;

//   get validatorMessages() {
//     return this._validatorMessages
//   }

//   private _validatorCustom = ValidatorsCustom;

//   get validatorCustom() {
//     return this._validatorCustom
//   }

//   formLoad() {
//     //console.log(this.data)
//     this.formMain = this._fb.group({
//       id: [this.data.id, []],
//       userName: [this.data.userName, []],
//       password: ['**********', []],
//       confirmPassword: ['**********', []],
//       email: [this.data.email, []],
//       company: this.subForm = this._fb.group({
//         id: [this.data.company.id, []],
//         name: [this.data.company.name, []],
//       })
//     })
//   }


//   updateUser() {
//     if (this.alertSave(this.formMain)) {
//       const user: MyUser = { ...this.formMain.value }

//       this._profileEditService.updateUser(user);
//       //  this.formLoad();
//     }

//   }




//   ngOnInit(): void {


//     this.formLoad();
//   }

// }
