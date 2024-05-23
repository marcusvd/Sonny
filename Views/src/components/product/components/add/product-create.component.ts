import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { EquipamentComponent } from '../common-components/equipament/equipament.component';
import { QuantitiesComponent } from '../common-components/quantities/quantities.component';
import { ProductCreateService } from './services/product-create.service';
import { ProductValidators } from './validators/product-validators';



@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    FlexLayoutModule,
    QuantitiesComponent,
    EquipamentComponent

  ]

})
export class ProductCreateComponent extends BaseForm implements OnInit {

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

  constructor(
    private _productService: ProductCreateService,
    // private _tableGGridService: TableGGridService,
    // private _router: ActivatedRoute,
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

  // formLoadQuantities() {
  //   return this.subForm = this._fb.group({
  //     sn: ['', [Validators.required]],
  //     nfNumber: ['', [Validators.required]],
  //     costPrice: ['', [Validators.required]],
  //     soldPrice: ['', [Validators.required]],
  //     warrantyEnd: ['', [Validators.required]],
  //     isUsed: [false, []],
  //     isTested: [false, []],
  //     usedHistorical: ['', []],
  //     supplierId: ['', [Validators.required]],
  //   })
  // }

  // get quantities() {
  //   return <FormArray>this.formMain.get('quantities')
  // }

  // addQuantity() {
  //   this.quantities.push(this.formLoadQuantities())
  // }

  // removeQuantity(index: number) {
  //   this.quantities.removeAt(index)
  // }


  // manufacturers:ManufacturerDto[];
  // segments:SegmentDto[];
  // selectItem(item: ItemDto) {
  //   this.equipamentForm.get('name').setValue(item.name);
  //   this.manufacturers = item.manufacturers;
  //   this.segments = item.segments;
  // }
  save() {

    if (this.alertSave(this.formMain)) {
      this._productService.save(this.formMain);
      this.formLoad();
    }

  }


  // itemsDto: ItemDto[];
  ngOnInit(): void {
    //partnersVendor
    this._productService.loadById$<PartnerDto[]>('Partners/GetAllHardwareVendorByCompanyIdAsync', JSON.parse(localStorage.getItem("companyId")))
      .subscribe((x: PartnerDto[]) => {
        this.partnersVendor = x;
      })

    this.screen();
    this.formLoad();
    // this.addQuantity();

    // this._router.data.subscribe(
    //   {
    //     next: ((x: any) => {
    //       console.log(x.loaded as ItemDto[])
    //       this.itemsDto = x.loaded as ItemDto[];
    //     })
    //   }
    // )
  }

}
