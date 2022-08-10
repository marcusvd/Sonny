import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierCrudService } from 'src/components/administrative/local/providers/supplier/services/supplier-crud.service';
import { MsgOperation } from '../../services/messages/snack-bar.service';
import { DeleteCrudService } from './services/delete_crud.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input() public first: string;

  //public first: string;
  public second: string;

  constructor(
    private _DialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _DeleteCrud: DeleteCrudService,
    private _SnackBar: MsgOperation

  ) {
    // console.log(data)
   }


  deleteRecord() {
    this._DeleteCrud.delete$(`${this.data.urlApi}/${this.data.record.id}`).subscribe(() => {
      this._SnackBar.msgCenterTop(`Item ${this.data.record.name}`, 1, 8);
      this._DialogRef.close('DELETED');
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
