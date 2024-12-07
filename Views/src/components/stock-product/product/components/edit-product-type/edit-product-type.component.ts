import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerEditProductType } from './useful/form-controller-edit-product-type';
import { ImportsEditProductType } from './useful/imports-edit-product-type';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    templateUrl: './edit-product-type.component.html',
    styleUrls: ['./edit-product-type.component.css'],
    imports: [ImportsEditProductType],
})
export class EditProductComponent extends FormControllerEditProductType implements OnInit, AfterViewInit {

    constructor(
        private _productTypeService: ProductTypeService,
        private _fbMain: FormBuilder,
        override _router: Router
    ) { super(_fbMain, _router) }
    ngAfterViewInit(): void {


    }


    ngOnInit(): void {
        this.firstCall();
        this.formLoad();
        this.formLoadProductType();
        this.formLoadProductTypeEdit();
        this.formLoadSegment();
        this.formLoadManufacturer();
        this.productsTypes$.subscribe(x => {
            this.formProductTypePushArray(x)
        })
    }

    firstCall() {
        this.productsTypes$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
    }



    entityToEdit = 'type';

    radioChange = (event: MatRadioChange) => {
        const value = event.value;

        switch (value) {
            case 'product-type':
                this.entityToEdit = "type";
                this.clearAllArray();
                this.productsTypes$.subscribe(x => {
                    this.formProductTypePushArray(x)
                })
                break;
            case 'segment':
                this.entityToEdit = "segment";
                this.clearAllArray();
                this.segments$ = null;
                break;
            case 'manufacturer':
                this.entityToEdit = "manufacturer";
                this.clearAllArray();
                this.manufacturers$ = null;
                break;
            case 'model':
                this.entityToEdit = "model";
                this.clearAllArray();
                this.models$ = null;
                break;
        }

    }

    onSelectedProductInSegment() {

    }

    searchModel() {

    }

    searchManufacturer() {

    }

    searchSegment() {

    }

    searchProduct() {

    }

    save(formArray: FormArray) {
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
            this._productTypeService.saveRangeTypes(formArray);
        else
            console.log('no save')


    }
    saveSingle() {
     
        if (this.alertSave(this.formMain)) 
            this._productTypeService.updateSingle(this.formMain);
        else
            console.log('no save')


    }


}
