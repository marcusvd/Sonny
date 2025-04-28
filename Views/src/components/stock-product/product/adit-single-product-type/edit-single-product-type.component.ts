import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypeDto } from '../dtos/product-type-dto';
import { FormControllerEditSingleProductType } from './helpers/form-controller-edit-single-product-type';
import { FormsBuilderHelperEditSingleProductTypeService } from './helpers/forms-builder-helper-edit-single-product-type.service';
import { ImportsEditSingleProductType } from './imports/imports-edit-single-product-type';
import { EditSingleProductTypeService } from './services/edit-single-product-type.service';


@Component({
    selector: 'product-edit-single-update',
    imports: [ImportsEditSingleProductType],
    templateUrl: './edit-single-product-type.component.html',
    styleUrls: ['./edit-single-product-type.component.scss'],
    providers: [EditSingleProductTypeService]
})
export class EditSingleProductTypeComponent extends FormControllerEditSingleProductType {

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

      this.formMain = this._formsBuilderHelperEditSingleProductTypeService.formLoad(this.productTypeToEdit);
      // this.loadMeasurers(this.specificity, this.speed$, this.productTypeToEdit, 'speed', this.speedFormControl)
      // this.loadMeasurers(this.specificity, this.storage$, this.productTypeToEdit, 'capacity', this.capacityFormControl)
    }
  }

  save() {
    console.log(this.formMain.controls)
    if (this.alertSave(this.formMain)) {
      // this.makeDescription();
      this.saveBtnEnabledDisabled = true;
      this._editSingleProductTypeService.updateSingle(this.formMain);
      this.formControlReset();
    }

  }

}
