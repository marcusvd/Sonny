
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { SupplierDeleteComponent } from "src/components/administrative/local/providers/supplier/components/supplier-delete/supplier-delete.component";



import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  record: any;
  private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`
  constructor(
    // private _PartnerService: PartnerService,
    // private _Crud: InventoryCrudService,
    private _Dialog: MatDialog,

  ) { }
  remove() {
    // record: Supplier, api: string
    const dialogRef = this._Dialog.open(SupplierDeleteComponent, {
      // width: '300px',
      // height: '300px',
      // data: record
    })
    dialogRef.disableClose = true;
    dialogRef.afterClosed()
      // .pipe(take(1))
      .subscribe(() => this.getAll(''));
  }

  getAll(api: string) {
    // this._Crud.loadAll$().subscribe((item: any) => {
    //   this._Search._entities = item
    //   this._Search._filteredEntity = item
    // });
  }




    // details(id: number) {
    //   this.record = new analyzeAndValidateNgModules;
    //   // this._supplier = this._providers.find(_id => _id.id == id);
    //   // console.log(this._supplier)
    //   this._Crud.loadById(id, this._API_URL_SUPPLIER).then((_supplier: any) => {
    //     const dialogRef = this._Dialog.open(SupplierDetailsComponent, {
    //       width: '400px',
    //       height: '400px',
    //       data: _supplier
    //     });
    //     dialogRef.disableClose = true;
    //   })
    // }





}
