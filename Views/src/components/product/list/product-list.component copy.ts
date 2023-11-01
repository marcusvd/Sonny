import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as _moment from 'moment';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { TableDataSource } from 'src/shared/components/table-g-grid/component/table-data-source-grid';
import { HttpParams } from '@angular/common/http';
import { TableGGridService } from 'src/shared/components/table-g-grid/services/table-g-grid.service';
import { ManufacturerDto } from '../dtos/manufacturer-dto';
import { EquipamentTypeDto } from '../dtos/equipament-type-dto';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

import * as moment from 'moment';
import { Moment } from 'moment';
import { ProductCreateService } from '../add/services/product-create.service';
import { ProductValidators } from '../add/validators/product-validators';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponentBKP extends BaseForm implements OnInit, AfterViewInit {

  dataSourceEquipament: TableDataSource;
  dataSourceManufacturer: TableDataSource;
  equipamentsLength: number;
  manufacturersLength: number;
  pageSize: number = 5;
  searchInputFxFlexSize: number = 100;
  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';
  partnersVendor: PartnerDto[] = [];

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private productValidators = ProductValidators;
  get prodValidators() {
    return this.productValidators
  }

  @ViewChild('equipamentsPaginator') eqpPg: MatPaginator;
  @ViewChild('manufacturersPaginator') manPg: MatPaginator;

  constructor(
    private _productService: ProductCreateService,
    private _tableGGridService: TableGGridService,
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  paramsTo(pgnumber: number = 1, pgsize: number = 10, term: string = '') {
    let params = new HttpParams();
    params = params.append('pgnumber', pgnumber);
    params = params.append('pgsize', pgsize);
    params = params.append('predicate', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', term);
    return params;
  }

  ngAfterViewInit(): void {
    this.eqpPg.page
      .pipe(
        tap(() => this.dataSourceEquipament.loadEntities('equipaments/GetAllPagedequipamentsAsync', this.paramsTo(this.eqpPg.pageIndex + 1, this.eqpPg.pageSize)))
      ).subscribe(() => {
      })

    this.manPg.page
      .pipe(
        tap(() => this.dataSourceManufacturer.loadEntities('Manufacturers/GetAllPagedManufacturersAsync', this.paramsTo(this.manPg.pageIndex + 1, this.manPg.pageSize)))
      ).subscribe(() => {
      })

  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            this.fxLayoutAlign = 'start start';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            this.fxLayoutAlign = 'start start';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
        }
      }
    })
  }


  isReserved() {
    const now = new Date().toJSON();
    this.subForm.get('isReserved').setValue(now);
  }

  formLoad() {
    this.formMain = this._fb.group({
      stockId: [JSON.parse(localStorage.getItem('stockId')), []],
      nameId: ['', []],
      manufacturerId: ['', []],
      model: ['', [Validators.required]],
      quantities: this._fb.array([]),
      description: ['', [Validators.required]],
      normalizedName: ['', [Validators.required]],
    })
  }

  formLoadQuantities() {
    return this.subForm = this._fb.group({
      sn: ['', [Validators.required]],
      nfNumber: ['', [Validators.required]],
      costPrice: ['', [Validators.required]],
      soldPrice: ['', [Validators.required]],
      warrantyEnd: ['', [Validators.required]],
      isUsed: [false, []],
      isTested: [false, []],
      usedHistorical: ['', []],
      supplierId: ['', [Validators.required]],
    })
  }

  get quantities() {
    return <FormArray>this.formMain.get('quantities')
  }

  addQuantity() {
    this.quantities.push(this.formLoadQuantities())
  }

  removeQuantity(index: number) {
    this.quantities.removeAt(index)
  }

  outputFieldSearchEquipament($event: FormControl) {

    const queryField: FormControl = $event;

    queryField.valueChanges.pipe(
      map(value => value.trim()),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(x => this.dataSourceEquipament.loadEntities$('equipaments/GetAllPagedequipamentsAsync', this.paramsTo(1, this.pageSize, x))),
      map(value => value)
    ).subscribe(x => {
      this.dataSourceEquipament.dataBase = x.body;
      this.dataSourceEquipament.searchItensFound.next(x.body.length)
    });


  }

  outputFieldSearchManufacturer($event: FormControl) {

    const queryField: FormControl = $event;

    queryField.valueChanges.pipe(
      map(value => value.trim()),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(x => this.dataSourceManufacturer.loadEntities$('Manufacturers/GetAllPagedManufacturersAsync', this.paramsTo(1, this.pageSize, x))),
      map(value => value)
    ).subscribe(x => {
      this.dataSourceManufacturer.dataBase = x.body;
      this.dataSourceManufacturer.searchItensFound.next(x.body.length)
    });


  }
  equipamentSelected: string = null;
  onChangeRadioChoiceEquipamentSelected($event: EquipamentTypeDto) {

    const equipamentSelected: EquipamentTypeDto = $event;
    this.equipamentSelected = equipamentSelected.name;
    this.formMain.get('nameId').setValue(equipamentSelected.id);
  }
  manufacturerSelected: string = null;
  onChangeRadioChoiceManufacturerSelected($event: ManufacturerDto) {
    const manufacturerSelected: ManufacturerDto = $event;
    this.manufacturerSelected = manufacturerSelected.name;
    this.formMain.get('manufacturerId').setValue(manufacturerSelected.id);
  }

  oneYear(index: number) {
    const year = new Date().getFullYear() + 1;
    const currentDate = new Date();
    const oneYearDate = currentDate.setFullYear(year)
    this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(oneYearDate));
  }

  threeMonths(index: number) {
    const month = new Date().getMonth() + 3;
    const currentDate = new Date();
    const threeMnth = currentDate.setMonth(month);
    if (this.formMain.get('quantities').get(index.toString()).get('isUsed').value) {
      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(threeMnth));
    }
    else {

      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(null);
    }
  }

  save() {
    const manufacturerEquipament = this.equipamentSelected + ' ' +
      this.manufacturerSelected + ' ' +
      this.formMain.get('model').value + ' ' +
      this.formMain.get('description').value;

    this.formMain.get('normalizedName').setValue(manufacturerEquipament);

    if (this.alertSave(this.formMain)) {
      this._productService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {

    //Equipament
    this.dataSourceEquipament = new TableDataSource(this._tableGGridService);
    this.dataSourceEquipament.loadEntities('equipaments/GetAllPagedequipamentsAsync', this.paramsTo(1, this.pageSize))

    //Manufacturer
    this.dataSourceManufacturer = new TableDataSource(this._tableGGridService);
    this.dataSourceManufacturer.loadEntities('Manufacturers/GetAllPagedManufacturersAsync', this.paramsTo(1, this.pageSize))

    //partnersVendor
    this._productService.loadById$<PartnerDto[]>('Partners/GetAllHardwareVendorByCompanyIdAsync', JSON.parse(localStorage.getItem("companyId")))
      .subscribe((x: PartnerDto[]) => {
        this.partnersVendor = x;
        console.log(x)
      })

    this.screen();
    // this._productService.getCompanyByIdGetStockId();
    this.formLoad();
    this.addQuantity();
    this._router.data.subscribe(
      {
        next: ((x: any) => {
          this.equipamentsLength = x.loaded['equipamentsLength'];
          this.manufacturersLength = x.loaded['manufacturersLength'];
        })
      }
    )

  }

}
