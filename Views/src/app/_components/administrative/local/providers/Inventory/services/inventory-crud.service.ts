import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { CategoryDto } from "../dto/category-dto";

@Injectable()

export class InventoryCrudService extends BackEndService<InventoryDto, number>{
  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder
  ) {
    super(_Http, environment._INVENTORIES);
  }
  public _formInventory: FormGroup;

  _makerFormValidation() {
    this._formInventory = this._Fb.group({
      subcategoryid: ['', []],
      cost: ['', []],
      saleprice: ['', []],
      isnew: ['', []],
      istested: ['', []],
      supplierid: ['', []],
      warranty: ['', []],
      today: ['', []],
      sn: ['', []],
      driver: ['', []],
      manufactorer: ['', []],
      model: ['', []],
      generation: ['', []],
      capacity: ['', []],
      speed: ['', []],
      comment: ['', []],
      historical: ['', []],
    })
  }

}
@Injectable()
export class CategoryInventoryCrudService extends BackEndService<CategoryDto, number>{
  constructor(protected _Http: HttpClient) {
    super(_Http, environment._CATEGORIESINCLUDED);
  }
}
@Injectable()
export class SupplierInventoryCrudService extends BackEndService<SupplierDto, number>{
  constructor(protected _Http: HttpClient) {
    super(_Http, environment._SUPPLIER);
  }
}
