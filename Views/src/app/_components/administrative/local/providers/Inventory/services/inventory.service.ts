import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { CategoryDto } from "../dto/category-dto";
import { SubCategoryDto } from "../dto/sub-category-dto";

@Injectable()
export class InventoryService extends BackEndService<InventoryDto, number>{

  private _categories: CategoryDto[];
  private _subcategories: SubCategoryDto[];
  private _suppliers: SupplierDto[] = [];
  private _isNewShowHide: boolean = false;
  private _selectedCat: number;
  public _formInventory: FormGroup;
  startDate = new Date(2021, 0, 1);

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation,
    private _CrudCategoryInventory: CategoryInventoryCrudService,
    private _CrudSupplierInventory: SupplierInventoryCrudService,
    private _Router: Router,
  ) {
    super(_Http, environment._INVENTORIES);
  }

  get categories() {
    return this._categories;
  }
  get subcategories() {
    return this._subcategories;
  }
  get suppliers() {
    return this._suppliers;
  }
  get isNewShowHide() {
    return this._isNewShowHide;
  }
  get selectedCat() {
    return this._selectedCat;
  }

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

  save() {
    const _inventory: InventoryDto = { ...this._formInventory.value };
    console.log('Antes', _inventory)

    this.add$<InventoryDto>(_inventory).subscribe((_inv: InventoryDto) => {
      console.log('Ja deu bom', _inv)
      this._SnackBar.msgCenterTop(`${_inv.manufactorer} ${_inv.model}`, 0, 2);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formInventory)
      // this._Router.navigate(['/list']);
    })


  }

  loadSupplier() {
    this.loadAll$<SupplierDto>().subscribe((Supplier: SupplierDto[]) => {
      this._suppliers = Supplier;
    })
  }

  OnChange() {
    let subChg = this._categories.map((catId: CategoryDto) => {
      if (catId.id === this._selectedCat)
        this._subcategories = catId.subcategories;
    })
  }

  loadCategory() {
    this.loadAll$<CategoryDto>().subscribe((categories: CategoryDto[]) => {
      this._categories = categories;
      this._categories.forEach((catDto: CategoryDto) => {
        this._subcategories = catDto.subcategories;
      })
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
