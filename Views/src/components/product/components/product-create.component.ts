import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import * as _moment from 'moment';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ProductCreateService } from '../product-create/services/product-create.service';
import { FormHandle } from 'src/shared/helpers/forms/form-handle';
import { TableDataSourceGridProductCreate } from '../product-create/table-data/table-data-source-grid-product-create.component';
import { TableGGridProductCreateService } from '../product-create/table-data/table-g-grid-product-create.service';
import { TableDataSourceStock } from '../table-data/table-data-source-grid-stock.component';
import { StockDto } from '../dto/product-dto';


const moment = _moment;

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']

})
export class ProductCreateComponent extends BaseForm implements OnInit {

  public isNew: boolean = true;
  partner: PartnerDto[] = [];

  title: string = 'Estoque';
  gridTitle: string = 'Fornecedor';
  subTitle: string = 'Cadastro';

  equipamentIdManufactorerCols: number;
  equipamentIdManufactorerRowHeight: string = '120px';

  partnerIdSnCols: number;
  partnerIdSnRowHeight: string = '120px';
  otherEquipamentModelCols: number;
  otherEquipamentModelRowHeight: string = '120px';

  costSalepriceCols: number;
  costSalepriceRowHeight: string = '120px';

  todayWarrantyCols: number;
  todayWarrantyRowHeight: string = '160px';

  IstestedIsnewDriverCols: number;
  IstestedIsnewDriverRowHeight: string = '140px';

  generationCapacitySpeedCols: number;
  generationCapacitySpeedRowHeight: string = '140px';

  commentHistoricalCols: number;
  commentHistoricalRowHeight: string = '350px';

  constructor(
    private _productService: ProductCreateService,
    private _tableGGridCreateService: TableGGridProductCreateService,
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  messageTooltipNameOther = 'Para um equipamento novo, selecione "OUTROS" no menu acima.'
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // private valCustom = ValidatorsCustom;
  // get validatorCustom() {
  //   return this.valCustom
  // }


  isNewView() {
    this.isNew = !this.isNew
  }
  get equipaments() {
    return this._productService.equipamentArray;
  }

  selectedItem(selected: PartnerDto) {
    FormHandle.setForm(this.formMain, 'partnerId', selected.id);
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.equipamentIdManufactorerCols = 1;

            this.partnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.IstestedIsnewDriverCols = 1;

            this.generationCapacitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            this.otherEquipamentModelCols = 1;
            break;
          }
          case 'small': {

            this.equipamentIdManufactorerCols = 1;

            this.partnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.IstestedIsnewDriverCols = 1;

            this.generationCapacitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            this.otherEquipamentModelCols = 1;
            break;
          }
          case 'medium': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 3;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 2;

            this.generationCapacitySpeedCols = 2;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
          case 'large': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 2;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 3;

            this.generationCapacitySpeedCols = 3;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
          case 'xlarge': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 2;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 3;

            this.generationCapacitySpeedCols = 3;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
        }
      }
    })
  }

  equipamentOnChange(value: string) {
    const selected = value;

    if (selected.toLocaleLowerCase() === 'outros') {
      this.formMain.controls['otherEquipament'].enable();
      this.matTooltip.enableDisable = true;
    }
    else if (selected.toLocaleLowerCase() != 'outros') {
      this.formMain.get('otherEquipament').reset();
      this.formMain.controls['otherEquipament'].disable();
      this.matTooltip.enableDisable = false;
    }
  }

  get isNewShowHide() {
    return this._productService.isNewShowHide;
  }
  selectedCat() {
    return this._productService.selectedCat;
  }

  get startDate() {
    return this._productService.startDate;
  }

  actualDate() {
    FormHandle.setForm(this.formMain, 'entryDate', new Date())
  }



  save() {

    if (this.alertSave(this.formMain)) {
      this._productService.save(this.formMain);
      this.formLoad();
    }

  }

  formLoad() {
    this.formMain = this._fb.group({
      companyId: [localStorage.getItem("companyId"), []],
      equipament: ['', [Validators.required, Validators.maxLength(100)]],
      otherEquipament: new UntypedFormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]),
      cost: ['', [Validators.required]],
      saleprice: ['', [Validators.required]],
      istested: [false, []],
      isnew: [false, []],
      partnerId: ['', [Validators.required]],
      warranty: ['', [Validators.required, Validators.min(0)]],
      entryDate: ['', [Validators.required]],
      sn: ['', [Validators.maxLength(24)]],
      nfNumber: ['', [Validators.maxLength(24)]],
      driver: ['', [Validators.maxLength(24)]],
      manufacturer: ['', [Validators.required, Validators.maxLength(30)]],
      model: ['', [Validators.required, Validators.maxLength(24)]],
      generation: ['', []],
      capacity: ['', [Validators.maxLength(24)]],
      speed: ['', [Validators.maxLength(24)]],
      comment: ['', [Validators.maxLength(250)]],
      historical: ['', [Validators.maxLength(500)]],
    })
  }

  dataSource: TableDataSourceGridProductCreate;
  length: number;
  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.dataSource = new TableDataSourceGridProductCreate(this._tableGGridCreateService);
    this._router.data.subscribe((obj: any) => {
      this.length = obj.loaded['stocksLength'] as number;
    })
  }

}
