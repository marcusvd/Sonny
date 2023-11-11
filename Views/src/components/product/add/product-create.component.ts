import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { TableDataSource } from 'src/shared/components/table-g-grid/component/table-data-source-grid';
import { TableGGridService } from 'src/shared/components/table-g-grid/services/table-g-grid.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ProductCreateService } from './services/product-create.service';
import { ProductValidators } from './validators/product-validators';
import { MatCheckbox } from '@angular/material/checkbox';
import { EquipamentFillDto } from '../dtos/equipament-fill-dto';
import { ManufacturerFillDto } from '../dtos/manufacturer-fill-dto';
import { GetTogetherDto } from '../dtos/get-together-dto';


@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']

})
export class ProductCreateComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';
  partnersVendor: PartnerDto[] = [];

  isUsed: boolean = false;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private productValidators = ProductValidators;
  get prodValidators() {
    return this.productValidators
  }

  constructor(
    private _productService: ProductCreateService,
    // private _tableGGridService: TableGGridService,
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

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

  equipamentForm: FormGroup;
  formLoad() {
    this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      equipament: this.equipamentForm = this._fb.group({
        name: ['', [Validators.required]],
        manufacturer: ['', [Validators.required]],
        segment: ['', [Validators.required]],
        model: ['', [Validators.required]],
        description: ['', []],
      }),
      quantities: this._fb.array([]),
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

  oneYear(index: number) {
    const year = new Date().getFullYear() + 1;
    const currentDate = new Date();
    const oneYearDate = currentDate.setFullYear(year)
    this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(oneYearDate));
  }

  threeMonths(index: number, $event: MatCheckbox) {
    const month = new Date().getMonth() + 3;
    const currentDate = new Date();
    const threeMnth = currentDate.setMonth(month);
    if (this.formMain.get('quantities').get(index.toString()).get('isUsed').value) {
      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(threeMnth));
    }
    else {

      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(null);
    }
    this.isUsed = $event.checked;

    // this.prodValidators.requiredIfBool(this.formMain,'quantities', index, this.isUsed,'usedHistorical');
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._productService.save(this.formMain);
      this.formLoad();
    }

  }


  GetTogetherDto = new GetTogetherDto();
  ngOnInit(): void {
    //partnersVendor
    this._productService.loadById$<PartnerDto[]>('Partners/GetAllHardwareVendorByCompanyIdAsync', JSON.parse(localStorage.getItem("companyId")))
      .subscribe((x: PartnerDto[]) => {
        this.partnersVendor = x;
      })

    // this._productService.loadById$<GetTogetherDto>('EquipamentsFillers/GetEqtSegMan', JSON.parse(localStorage.getItem("companyId")))
    //   .subscribe((x: GetTogetherDto) => {
    //     this.GetTogetherDto.Equipaments_Fill = x.Equipaments_Fill;
    //     this.GetTogetherDto.Manufacturers_Fill = x.Manufacturers_Fill;
    //     this.GetTogetherDto.Segments_Fill = x.Segments_Fill;
    //     console.log(x)
    //   })

    this.screen();
    this.formLoad();
    this.addQuantity();

    this._router.data.subscribe(
      {
        next: ((x: any) => {
          const getTogether: GetTogetherDto = x.loaded;
          this.GetTogetherDto.equipaments_Fill = getTogether.equipaments_Fill;
          this.GetTogetherDto.manufacturers_Fill = getTogether.manufacturers_Fill;
          this.GetTogetherDto.segments_Fill = getTogether.segments_Fill;
        })
      }
    )
  }

}
