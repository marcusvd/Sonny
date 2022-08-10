import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierCrudService } from 'src/components/providers/supplier/services/supplier-crud.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { ConfirmCrudService } from '../confirm-modal/services/confirm_crud.service';


@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() public first: string;

  //public first: string;
  public second: string;

  constructor(
    private _DialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _ConfirmCrud: ConfirmCrudService,
    private _SnackBar: MsgOperation

  ) {
    console.log(data)
   }


  // deleteRecord() {
  //   this._ConfirmCrud .delete$(`${this.data.urlApi}/${this.data.record.id}`).subscribe(() => {
  //     this._SnackBar.msgCenterTop(`Item ${this.data.record.name}`, 1, 8);
  //     this._DialogRef.close('DELETED');
  //   }, error => {
  //     console.log(error);
  //   })
  // }



clickedYes(){
  this._DialogRef.close('yes');
  // console.log('YES')
}
clickedNo(){
  this._DialogRef.close('no');
  // console.log('NO')
}
  ngOnInit(): void {

  }

}
