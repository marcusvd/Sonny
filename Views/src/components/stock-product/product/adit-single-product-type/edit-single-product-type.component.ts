import { Component, OnInit } from '@angular/core';


import { FormControllerEditSingleProductType } from './helpers/form-controller-edit-single-product-type';
import { FormsBuilderHelperEditSingleProductTypeService } from './helpers/forms-builder-helper-edit-single-product-type.service';
import { ImportsEditSingleProductType } from './imports/imports-edit-single-product-type';
import { EditSingleProductTypeService } from './services/edit-single-product-type.service';
import { ProductTypeDto } from '../dtos/product-type-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SegmentDto } from '../dtos/segment-dto';
import { ManufacturerDto } from '../dtos/manufacturer-dto';
import { ModelDto } from '../dtos/model-dto';
import { SpecificitiesDto } from '../dtos/specificities-dto';
import { ProductTypeAfterEditHandled } from '../dtos/product-type-after-edit-handled';


@Component({
  selector: 'product-edit-single-update',
  standalone: true,
  imports: [ImportsEditSingleProductType],
  templateUrl: './edit-single-product-type.component.html',
  styleUrls: ['./edit-single-product-type.component.scss'],
  providers: [EditSingleProductTypeService]
})
export class EditSingleProductTypeComponent extends FormControllerEditSingleProductType implements OnInit {

  constructor(
    private readonly _editSingleProductTypeService: EditSingleProductTypeService,
    private readonly _formsBuilderHelperEditSingleProductTypeService: FormsBuilderHelperEditSingleProductTypeService,
    private readonly _actRoute: ActivatedRoute,
    private _router: Router,
  ) {
    super()

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.productTypeAfterEditHandled = (obj as ProductTypeAfterEditHandled);

    }
  }

  productTypeAfterEditHandled: ProductTypeAfterEditHandled = new ProductTypeAfterEditHandled();

  segment: SegmentDto = null;
  manufacturer: ManufacturerDto = null;
  model: ModelDto = null;
  specificities: SpecificitiesDto = null;

  ngOnInit(): void {



    // const id = this._actRoute.snapshot.params['id'];

    const productType: Observable<ProductTypeDto> = this._editSingleProductTypeService.getProductTypeByIdAllIncluded$(this.productTypeAfterEditHandled.productTypesId.toString());
    productType.subscribe(x => {
      this.formMain = this._formsBuilderHelperEditSingleProductTypeService.formLoad(x);
      
      // this.segment = x.segments.find(y => y.id == this.productTypeAfterEditHandled.segmentId);

      // this.manufacturer = this.segment.manufacturers.find(y => y.id == this.productTypeAfterEditHandled.manufacturerId);

      // this.model = this.manufacturer.models.find(y => y.id == this.productTypeAfterEditHandled.modelId);

      // console.log(this.model)

      // this.segmentForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadSegment(this.segment)
      // this.manufacturerForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadManufacturer(this.manufacturer)
      // this.modelForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadModel(this.model)

    })


    //this.addEmptyFormArrays();
  }

  save() {
    if (this.alertSave(this.formMain)) {
      this.setFormFieldEnableDisable(this.specificitiesForm, 'description', true);
      this.makeDescription();
      this.saveBtnEnabledDisabled = true;
      // this._editSingleProductType.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm);
      this.formControlReset();
    }

  }

}
