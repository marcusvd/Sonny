import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManufacturerDto } from '../../dtos/manufacturer-dto';
import { ModelDto } from '../../dtos/model-dto';
import { SegmentDto } from '../../dtos/segment-dto';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerEditProductType } from './useful/form-controller-edit-product-type';
import { ImportsEditProductType } from './useful/imports-edit-product-type';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { map } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';

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
    ) { super(_fbMain) }
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




}
