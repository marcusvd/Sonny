import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';

import * as _moment from 'moment';
import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { environment } from 'src/environments/environment';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { CategoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/category-dto';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto';
import { InventoryCrudService } from '../services/inventory-crud.service';



const moment = _moment;


@Component({
  selector: 'inventory-sales',
  templateUrl: './sales-inventory.html',
  styleUrls: ['./sales-inventory.scss']

})
export class SalesInventory implements OnInit {

  public _formInventory: FormGroup;
  public _suppliers: ClientDto[] = [];
  public _isNewShowHide: boolean = false;
  public _categories;
  private _msgs: string[] = ['Hardware adicionado ao estoque com sucesso!']

  private readonly _API_URL: string = `${environment._INVENTORIES}`
  private readonly _API_URL_CATEGORY: string = `${environment._CATEGORY}`
  private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`

  constructor(
    private _FormBuilder: FormBuilder,
    public _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation,
    private _Crud: InventoryCrudService,
    public _ButtonBack: NavBackService,
    public _Router: Router,
  ) { }

  _form() {
    this._formInventory = this._FormBuilder.group({
      categoryId: ['', []],
      cost: ['', []],
      salePrice: ['', []],
      isNew: ['', []],
      isTested: ['', []],
      supplierId: ['', []],
      warranty: ['', []],
      today: ['', []],
      sn: ['', []],
      driver: ['', []],
      manufactorer: ['', []],
      model: ['', []],
      capacity: ['', []],
      speed: ['', []],
      comment: ['', []],
      historical: ['', []],
      generation: ['', []],
      endOfWarranty: ['', []],
    })
  }
  startDate = new Date(2021, 0, 1);
  save() {
    // this._formInventory.value.endOfWarranty = new Date(2021, 0, 1);
    // this._formInventory.value.today_ = new Date(2021, 0, 1);
    this._formInventory.value.endOfWarranty = this._formInventory.value.today;
    this._formInventory.value.today_ = this._formInventory.value.today;
    const _inventory: InventoryDto = Object.assign(this._formInventory.value);


    if (this._formInventory.value.isNew != true) {
      this._formInventory.value.supplierId = 1;
      this._formInventory.value.isNew = false;
    }



    this._Crud.add$<InventoryDto>(_inventory).subscribe((_inventory: InventoryDto) => {
      this._SnackBar.msgCenterTop(`${_inventory.manufactorer} ${_inventory.model}`, 0, 2);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formInventory)
      this._Router.navigate(['/list']);
    })


  }


  isNewOnChange($event): void {
    if ($event.checked) {
      this._Crud.loadAll$<SupplierDto>().subscribe((Supplier: SupplierDto[]) => {

      })
    }

    this._isNewShowHide = $event.checked;
  }



  public selected: string;
  registers: string[] = ['Cadastrado.', 'Não Cadastrado.'];

  ngOnInit(): void {
    this._form();
    this._Crud.loadAll$<CategoryDto>().subscribe((categories: CategoryDto[]) => {

      //this._categories = categories;
      // console.log(this._categories);



    })
  }

}
