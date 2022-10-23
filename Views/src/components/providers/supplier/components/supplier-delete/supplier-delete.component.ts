import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { environment } from 'src/environments/environment';
import { SupplierDto } from '../../dto/supplier-dto';
import { SupplierCrudService } from '../../services/supplier-crud.service';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.css']
})
export class SupplierDeleteComponent implements OnInit {

  private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`

  constructor(
    private _Crud: SupplierCrudService,
    private _DialogRef: MatDialogRef<SupplierDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: SupplierDto,
    private _SnackBar: MsgOperation
  ) { }

  deleteRecord() {
    this._Crud.remove$(this.data.id).subscribe(() => {
      this._SnackBar.msgCenterTop(`Parceiro ${this.data.name} ${this.data.seller}`, 1, 8);
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
