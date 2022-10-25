import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as _moment from 'moment';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { SupplierDto } from 'src/components/providers/supplier/dto/supplier-dto';
import { InventoryDto } from 'src/components/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryCreateService } from '../../services/inventory-create.service';
import { EquipamentDto } from '../inventory-equipament/dto/equipament-dto';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';


// import { _isNumberValue } from '@angular/cdk/coercion';



const moment = _moment;


@Component({
  selector: 'inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']

})
export class InventoryCreateComponent extends BaseForm implements OnInit {

  public isNew: boolean = true;
  private _equipament: EquipamentDto[] = [];
  private _partner: PartnerDto[] = [];

  equipamentIdManufactorerCols: number;
  equipamentIdManufactorerRowHeight: string = '120px';

  modelPartnerIdSnCols: number;
  modelPartnerIdSnRowHeight: string = '120px';

  costSalepriceCols: number;
  costSalepriceRowHeight: string = '120px';

  todayWarrantyCols: number;
  todayWarrantyRowHeight: string = '120px';

  istestedIsnewDriverCols: number;
  istestedIsnewDriverRowHeight: string = '140px';

  generationCapacityQuantitySpeedCols: number;
  generationCapacityQuantitySpeedRowHeight: string = '140px';


  commentHistoricalCols: number;
  commentHistoricalRowHeight: string = '350px';

  constructor(
    private _InventoryService: InventoryCreateService,
    private _ActRouter: ActivatedRoute,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


  isNewView() {
    this.isNew = !this.isNew
  }
  get equipaments() {
    return this._equipament;
  }
  get partners() {
    return this._partner;
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.equipamentIdManufactorerCols = 1;

            this.modelPartnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.istestedIsnewDriverCols = 1;

            this.generationCapacityQuantitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            break;
          }
          case 'small': {

            this.equipamentIdManufactorerCols = 1;

            this.modelPartnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.istestedIsnewDriverCols = 1;

            this.generationCapacityQuantitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            break;
          }
          case 'medium': {

            this.equipamentIdManufactorerCols = 2;

            this.modelPartnerIdSnCols = 3;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.istestedIsnewDriverCols = 2;

            this.generationCapacityQuantitySpeedCols = 2;

            this.commentHistoricalCols = 2;
            break;
          }
          case 'large': {

            this.equipamentIdManufactorerCols = 2;

            this.modelPartnerIdSnCols = 3;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.istestedIsnewDriverCols = 3;

            this.generationCapacityQuantitySpeedCols = 4;

            this.commentHistoricalCols = 2;
            break;
          }
          case 'xlarge': {

            this.equipamentIdManufactorerCols = 2;

            this.modelPartnerIdSnCols = 3;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.istestedIsnewDriverCols = 3;

            this.generationCapacityQuantitySpeedCols = 4;

            this.commentHistoricalCols = 2;
            break;
          }
        }
      }
    })
  }

  get isNewShowHide() {
    return this._InventoryService.isNewShowHide;
  }
  selectedCat() {
    return this._InventoryService.selectedCat;
  }
  get formMainTmp() {
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
    this.screen();
    this._ActRouter.data.subscribe((obj: any) => {
      this._equipament = obj.loaded['equipaments'];
      this._partner = obj.loaded['partners'] as PartnerDto[];
      this._partner = this._partner.filter(p => p.supplier === true);
    })
  }

}
