import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountEditInfoComponent } from '../user/components/account/account-edit-info/account-edit-info.component';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { CommunicationAlerts } from 'src/shared/services/messages/snack-bar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService extends BackEndService<MyUser> {

  constructor(
    private _dialog: MatDialog,
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._ACCOUNT)
  }


  openDialogAccountInfoEdit(user: MyUser) {
    const dialogRef = this._dialog.open(AccountEditInfoComponent, {
      width: '100%',
      height: '430px',
      data: user
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log('the dialog was closed');
      // this.animal = result;
    })

  }
  // openDialogAccountInfoEdit(user: MyUser) {
  //   const dialogRef = this._dialog.open(AccountEditInfoComponent, {
  //     width: '100%',
  //     height: '430px',
  //     data: user
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('the dialog was closed');
  //     // this.animal = result;
  //   })

  // }


  // updateUser(form?: FormGroup) {
  //   const toUpdate: MyUser = { ...form.value }
  //   if (toUpdate.password != '**********' || null) {
  //     toUpdate.passwordChanged = true;
  //   }


  //   this.update$<MyUser>('UpdateUserAsync', toUpdate).subscribe({
  //     next: ((user: MyUser) => {
  //       this._communicationsAlerts.communication('', 2, 2, 'top', 'center');
  //     }), error: ((err: any) => {
  //       console.log(err);
  //       this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
  //     })
  //   })
  // }


  updateUser(user?: MyUser) {
    console.log(user)
    // this.update$<MyUser>('UpdateUserAsync', user).subscribe({
    //   next: ((user: MyUser) => {
    //     this._communicationsAlerts.communication('', 2, 2, 'top', 'center');
    //   }), error: ((err: any) => {
    //     console.log(err);
    //     this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
    //   })
    // })
  }


}
