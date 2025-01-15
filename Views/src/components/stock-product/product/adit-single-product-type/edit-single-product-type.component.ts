import { Component, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerDto } from '../dtos/manufacturer-dto';
import { ModelDto } from '../dtos/model-dto';
import { ProductTypeDto } from '../dtos/product-type-dto';
import { SegmentDto } from '../dtos/segment-dto';
import { SpecificitiesDto } from '../dtos/specificities-dto';
import { FormControllerEditSingleProductType } from './helpers/form-controller-edit-single-product-type';
import { FormsBuilderHelperEditSingleProductTypeService } from './helpers/forms-builder-helper-edit-single-product-type.service';
import { ImportsEditSingleProductType } from './imports/imports-edit-single-product-type';
import { EditSingleProductTypeService } from './services/edit-single-product-type.service';


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
      this.productTypeToEdit = (obj as ProductTypeDto);

      this.speed$.subscribe(
        x => {
          const description = this.productTypeToEdit.segments[0].manufacturers[0].models[0].specificities.description;
          const splited = description.split(',')
          splited.forEach(element => {
            if (element.toLowerCase().includes('velocidade:')) {
              this.speedFormControl.setValue(x.find(y => y.name == `(${element.split('(')[1].split(')')[0]})`).id)
            }
          })
        }
      )
     
      this.storage$.subscribe(
        x => {
          const description = this.productTypeToEdit.segments[0].manufacturers[0].models[0].specificities.description;
          const splited = description.split(',')
          splited.forEach(element => {
            if (element.toLowerCase().includes('capacidade:')) {
              this.capacityFormControl.setValue(x.find(y => y.name == `(${element.split('(')[1].split(')')[0]})`).id)
            }
          })
        }
      )


    }
  }

  productTypeToEdit: ProductTypeDto = new ProductTypeDto();

  segment: SegmentDto = null;
  manufacturer: ManufacturerDto = null;
  model: ModelDto = null;
  specificities: SpecificitiesDto = null;

  ngOnInit(): void {



    // const id = this._actRoute.snapshot.params['id'];
    this.formMain = this._formsBuilderHelperEditSingleProductTypeService.formLoad(this.productTypeToEdit);

    //   const productType: Observable<ProductTypeDto> = this._editSingleProductTypeService.getProductTypeByIdAllIncluded$(this.productTypeToEdit);
    //   productType.subscribe(x => {

    //     // this.segment = x.segments.find(y => y.id == this.productTypeAfterEditHandled.segmentId);

    //     // this.manufacturer = this.segment.manufacturers.find(y => y.id == this.productTypeAfterEditHandled.manufacturerId);

    //     // this.model = this.manufacturer.models.find(y => y.id == this.productTypeAfterEditHandled.modelId);

    //     // console.log(this.model)

    //     // this.segmentForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadSegment(this.segment)
    //     // this.manufacturerForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadManufacturer(this.manufacturer)
    //     // this.modelForm = this._formsBuilderHelperEditSingleProductTypeService.formLoadModel(this.model)

    //   })


    //   //this.addEmptyFormArrays();
  }



  get segments() {
    return this.formMain.get('segments').get('0') as FormGroup;
  }
  get manufacturers() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0') as FormGroup;
  }
  get models() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0').get('models').get('0') as FormGroup;
  }
  get specificity() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0').get('models').get('0').get('specificities') as FormGroup;
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
