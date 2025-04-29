import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioChange as MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { FormControllerEditProductType } from './helpers/form-controller-edit-product-type';
import { ImportsEditProductType } from './imports/imports-edit-product-type';
import { EditAllProductTypeService } from './services/edit-all-product-type.service';

@Component({
    selector: 'edit-all-product-type',
    standalone: true,
    templateUrl: './edit-all-product-type.component.html',
    styleUrls: ['./edit-all-product-type.component.css'],
    imports: [ImportsEditProductType],
})
export class EditAllProductComponent extends FormControllerEditProductType implements OnInit {

    constructor(
        private _editAllProductTypeService: EditAllProductTypeService,
        private _fbMain: FormBuilder,
        override _router: Router
    ) { super(_fbMain, _router) }

    ngOnInit(): void {
        this.firstCall();
        this.formLoad();
        this.formLoadProductType();
        this.formLoadProductTypeEdit();
        this.formLoadSegment();
        this.formLoadManufacturer();
        this.formLoadModel();
        this.productsTypes$.subscribe(x => {
            this.formProductTypePushArray(x)
        })
    }

    firstCall() {
       // this.productsTypes$ = this._editAllProductTypeService.getAllIncluded$(this.companyId.toString());
    }

    entityToEdit = 'type';
    test = false;
    radioChange = (event: MatRadioChange) => {
        const value = event.value;

        switch (value) {
            case 'product-type':
                this.entityToEdit = "type";
                this.clearAllArray();
                this.productsTypes$.subscribe(x => {
                    this.formProductTypePushArray(x)
                })
                this.formControlReset();
                this.setEntitiesToNull();
                break;
            case 'segment':
                this.entityToEdit = "segment";
                this.clearAllArray();
                this.segments$ = null;
                this.formControlReset();
                this.setEntitiesToNull();
                break;
            case 'manufacturer':
                this.entityToEdit = "manufacturer";
                this.clearAllArray();
                this.manufacturers$ = null;
                this.formControlReset();
                this.setEntitiesToNull();
                break;
            case 'model':
                this.entityToEdit = "model";
                this.clearAllArray();
                this.models$ = null;
                this.formControlReset();
                this.setEntitiesToNull();
                break;
            case 'specificities':
                this.entityToEdit = "specificities";
                this.clearAllArray();
                this.specificities$ = null;
                this.formControlReset();
                this.setEntitiesToNull();
                break;
        }

    }


    setEntitiesToNull() {
        this.segments$ = null;
        this.manufacturers$ = null;
        this.models$ = null;
        this.specificities$ = null;
    }

    saveArray(formArray: FormArray) {

        let ok: boolean[] = [];
        let save: boolean = true;

        formArray.controls.forEach((value, i) => {
            ok.push(this.alertSave(value as FormGroup));
        })

        ok.forEach(x => {
            if (!x) {
                save = false
            }
        })

        if (save)
        {
            // this._productTypeService.updateRangeTypes(formArray);
        }

    }
    saveSingle() {

        if (this.alertSave(this.formMain)){

            // this._productTypeService.updateSingle(this.formMain);
        }

    }


}
