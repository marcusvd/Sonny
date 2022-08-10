import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/shared/helpers/validators.service';

import * as _moment from 'moment';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { environment } from 'src/environments/environment';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/components/providers/supplier/dto/supplier-dto';

import { InventoryDto } from 'src/components/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import {  InventoryCreateService } from '../../services/inventory-create.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
const moment = _moment;


@Component({
  selector: 'inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']

})
export class InventoryEditComponent implements OnInit {



  public _formInventory: FormGroup;

  public _isNewShowHide: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    public _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation,
    private _InventoryService: InventoryCreateService,
    public _ButtonBack: NavBackService,
    public _Router: Router,
    public _ActRoute: ActivatedRoute,
  ) { }



  startDate = new Date(2021, 0, 1);

  save() {
    // this._formInventory.value.endOfWarranty = new Date(2021, 0, 1);
    // this._formInventory.value.today_ = new Date(2021, 0, 1);
    // this._formInventory.value.endOfWarranty = this._formInventory.value.today;
    // this._formInventory.value.today_ = this._formInventory.value.today;


    // if (this._formInventory.value.isNew != true) {
    //   this._formInventory.value.supplierId = 1;
    //   this._formInventory.value.isNew = false;
    // }

    const _inventory: InventoryDto = { ...this._formInventory.value };
    console.log(_inventory)
    this._InventoryService.update$<InventoryDto>(_inventory).subscribe((_inventory: InventoryDto) => {
      this._SnackBar.msgCenterTop(`${_inventory.manufactorer} ${_inventory.model}`, 2, 2);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formInventory)
      this._Router.navigate(['/list']);
    })


  }
  //SUPPLIER
  public _suppliersSub: Subscription;
  public _suppliers: SupplierDto[] = [];

  // loadSupplier() {
  //   this._suppliersSub = this._CrudSupplierInventory.loadAll$<SupplierDto>().subscribe((Supplier: SupplierDto[]) => {
  //     this._suppliers = Supplier;
  //   })
  // }
  //CATEGORIES


  // loadCategory() {
  //   this._categoriesSub = this._CrudCategoryInventory.loadAll$<CategoryDto>().subscribe((categories: CategoryDto[]) => {
  //     this._categories = categories;
  //   })
  // }

  //RESOLVER
  // loadInventory() {
  //   this._ActRoute.data.subscribe(
  //     (res: { CatEdit: CategoryDto[] }) => {
  //       this._categories = res.CatEdit;
  //       res.CatEdit.forEach((_catSingle) => {

  //         // if (_catSingle.) { }

  //       });
  //       console.log(res.CatEdit)


  //       // this._selected =  res.CatEdit.map(names => names.name);
  //     })
  //   //   this._InventoryService.loadAll$<InventoryDto>().subscribe((inventories: InventoryDto[]) => {
  //   //   console.log(inventories)
  //   // })


  // }

  LoadAllInventory$(): Observable<InventoryDto> {
    return this._ActRoute.params.
      pipe(map((params: any) => params['id']), switchMap(
        _id =>
          this._InventoryService.loadById$<InventoryDto>(_id)))
  }


  public _inventory: InventoryDto = new InventoryDto();
  loadAll() {
    // this.loadSupplier();
    // this.loadCategory();
    this.LoadAllInventory$().subscribe((inventorySingle: InventoryDto) => {
      this._inventory = inventorySingle;
      this._formInventory.patchValue(inventorySingle);
    })
  }

  _makerFormValidation() {
    this._formInventory = this._FormBuilder.group({
      id: ['', []],
      categoryid: ['', []],
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



  ngOnInit(): void {
    //  this.loadInventory();
    this._makerFormValidation();
    this.loadAll();
  }

}
