import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';

import * as _moment from 'moment';
import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryCreateService } from '../services/inventory-create.service';
import { EquipamentDto } from '../inventory-equipament/dto/equipament-dto';
import { PartnerDto } from '../../../out-sourced/dto/partner-dto';

// import { _isNumberValue } from '@angular/cdk/coercion';



const moment = _moment;


@Component({
  selector: 'inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']

})
export class InventoryCreateComponent implements OnInit {

  public isNew: boolean = true;
  private _equipament: EquipamentDto[] = [];
  private _partner: PartnerDto[] = [];

  constructor(
    private _InventoryService: InventoryCreateService,
    private _ActRouter: ActivatedRoute
  ) { }


  isNewView() {
    this.isNew = !this.isNew
  }
  get equipaments() {
    return this._equipament;
  }
  get partners() {
    return this._partner;
  }


  get isNewShowHide() {
    return this._InventoryService.isNewShowHide;
  }
  selectedCat() {
    return this._InventoryService.selectedCat;
  }
  get formMain() {
    return this._InventoryService._formInventory;
  }
  get startDate() {
    return this._InventoryService.startDate;
  }

  OnChange() {
    // this._InventoryService.OnChange();
  }

  save() {
    this._InventoryService.save();
  }





  ngOnInit(): void {
    this._InventoryService.formLoad();
    this._ActRouter.data.subscribe((obj: any) => {
      this._equipament = obj.loaded['equipaments'];
      this._partner = obj.loaded['partners'] as PartnerDto[];
      this._partner = this._partner.filter(p => p.supplier === true);
    })
  }

}
