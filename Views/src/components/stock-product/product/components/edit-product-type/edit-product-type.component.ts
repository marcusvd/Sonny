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

@Component({
    selector: 'app-edit-product',
    standalone: true,
    templateUrl: './edit-product-type.component.html',
    styleUrls: ['./edit-product-type.component.css'],
    imports: [ImportsEditProductType],
})
export class EditProductComponent extends FormControllerEditProductType implements OnInit, AfterViewInit  {

    constructor(
        private _productTypeService: ProductTypeService,
        private _fbMain: FormBuilder,
    ) { super(_fbMain) }
    ngAfterViewInit(): void {
      

    }


    ngOnInit(): void {
        // this.formLoad();

        this.productsTypes$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
        this.formLoadProductType();
        this.formLoadProductTypeEdit();
        // this.formLoadSegment();
        // this.formLoadManufacturer();
        // this.formLoadModel();
        this.productsTypes$.subscribe(x => {
            this.formProductTypePushArray(x)
        })
    }
    //FormControls
    productTypeFormControl = new FormControl()
    segmentFormControl = new FormControl()
    manufacturerFormControl = new FormControl()
    modelFormControl = new FormControl()
    speedFormControl = new FormControl()
    capacityFormControl = new FormControl()
    descriptionFormControl = new FormControl()

    shownOnlyProducts: boolean = true;
    onCheckedEditProduct(check: MatCheckboxChange) {
        this.shownOnlyProducts = !check.checked;
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
