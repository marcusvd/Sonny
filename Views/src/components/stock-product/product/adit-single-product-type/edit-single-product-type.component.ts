import { Component, OnInit } from '@angular/core';


import { FormControllerEditSingleProductType } from './helpers/form-controller-edit-single-product-type';
import { FormsBuilderHelperEditSingleProductTypeService } from './helpers/forms-builder-helper-edit-single-product-type.service';
import { ImportsEditSingleProductType } from './imports/imports-edit-single-product-type';
import { EditSingleProductTypeService } from './services/edit-single-product-type.service';
import { ProductTypeDto } from '../dtos/product-type-dto';


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
    private readonly _formsBuilderHelperEditSingleProductTypeService: FormsBuilderHelperEditSingleProductTypeService
  ) {
    super()
  }

  ngOnInit(): void {

    let test:ProductTypeDto = null;

    this._editSingleProductTypeService.getProductTypes$(this.companyId).subscribe(x => {
      test = x[0];
    });
    this.formMain = this._formsBuilderHelperEditSingleProductTypeService.formLoad(this.companyId, this.userId, test);

    this.addEmptyFormArrays();
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
