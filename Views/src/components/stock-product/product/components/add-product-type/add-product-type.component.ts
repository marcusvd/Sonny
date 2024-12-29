import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProductType } from './useful/form-controller-add-product-type';
import { ImportsProductType } from './useful/imports-product-type';
import { ProductTypeValidatorAsync } from './useful/product-type-validator-async-fields';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'product-add-update',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss'],
  providers: [ProductTypeService]
})
export class AddProductTypeComponent extends FormControllerAddProductType implements OnInit {

  constructor(
    public _fbMain: FormBuilder,
    public _productTypeService: ProductTypeService,
    override _productTypeValidatorAsync: ProductTypeValidatorAsync,

  ) {
    super(_fbMain, _productTypeValidatorAsync)
  }

  ngOnInit(): void {
    this.formLoad();
    this.addEmptyFormArrays();
  }

  speedMeasure = 'Hz'
  storageMeasure = 'Kb'

  noEntriesFoundLabel = '';
  placeholderProduct = '';
  productNameAttribute = '';

  formErrosValidation = false;


  speed$ = of([{ id: 1, name: 'Hz' }, { id: 2, name: 'Khz' }, { id: 3, name: 'Mhz' }, { id: 4, name: 'Ghz' }, { id: 5, name: 'Thz' }, { id: 6, name: 'Rpm' }, { id: 7, name: 'Kbps' }, { id: 8, name: 'Mbps' }, { id: 9, name: 'Gbps' }]);
  storage$ = of([{ id: 1, name: 'Kb' }, { id: 2, name: 'Mb' }, { id: 3, name: 'Gb' }, { id: 4, name: 'Tb' }]);


  onSelectSpeedMeasure(id: number) {
    this.speed$.pipe(map(x => {
      const result = x.find(item => item.id === id)
      this.speedMeasure = result.name;
    })).subscribe();
  }

  onSelectStorageMeasure(id: number) {
    this.storage$.pipe(map(x => {
      const result = x.find(item => item.id === id)
      this.storageMeasure = result.name;
    })).subscribe();
  }


  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm);
      this.formControlReset();
    }
    else
      this.formErrosValidation = true;

  }


}
