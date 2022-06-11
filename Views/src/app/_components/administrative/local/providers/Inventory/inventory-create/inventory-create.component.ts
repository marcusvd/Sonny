import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';

import * as _moment from 'moment';
import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { CategoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/category-dto';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryInventoryCrudService, InventoryCrudService, SupplierInventoryCrudService } from '../services/inventory-crud.service';
import { SubCategoryDto } from '../dto/sub-category-dto';
// import { _isNumberValue } from '@angular/cdk/coercion';



const moment = _moment;


@Component({
  selector: 'inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']

})
export class InventoryCreateComponent implements OnInit {


  public _categories: CategoryDto[];
  public _subcategories: SubCategoryDto[];
  public _suppliers: SupplierDto[] = [];
  public _isNewShowHide: boolean = false;
  public _selectedCat: number;
  constructor(

    public _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation,
    public _InventoryCrud: InventoryCrudService,
    private _CrudCategoryInventory: CategoryInventoryCrudService,
    private _CrudSupplierInventory: SupplierInventoryCrudService,
    public _ButtonBack: NavBackService,
    public _Router: Router,
  ) { }

  startDate = new Date(2021, 0, 1);

  save() {
    const _inventory: InventoryDto = { ...this._InventoryCrud._formInventory.value };
    console.log('Antes', _inventory)

    this._InventoryCrud.add$<InventoryDto>(_inventory).subscribe((_inv: InventoryDto) => {
      console.log('Ja deu bom', _inv)
      this._SnackBar.msgCenterTop(`${_inv.manufactorer} ${_inv.model}`, 0, 2);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._InventoryCrud._formInventory)
     // this._Router.navigate(['/list']);
    })


  }


  loadSupplier() {
    this._CrudSupplierInventory.loadAll$<SupplierDto>().subscribe((Supplier: SupplierDto[]) => {
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
    this._CrudCategoryInventory.loadAll$<CategoryDto>().subscribe((categories: CategoryDto[]) => {
      this._categories = categories;
      this._categories.forEach((catDto: CategoryDto) => {
        this._subcategories = catDto.subcategories;
      })
    })
  }

  LoadAll() {
    this.loadSupplier();
    this.loadCategory();
  }



  ngOnInit(): void {
    this._InventoryCrud._makerFormValidation();
    this.LoadAll();
  }

}
