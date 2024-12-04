import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManufacturerDto } from '../../dtos/manufacturer-dto';
import { ModelDto } from '../../dtos/model-dto';
import { SegmentDto } from '../../dtos/segment-dto';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { ProductTypeService } from '../../services/product-type.service';
import { EditProductTypeFormController } from './useful/edit-product-type-form-controller';
import { ImportsEditProductType } from './useful/imports-edit-product-type';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    templateUrl: './edit-product-type.component.html',
    styleUrls: ['./edit-product-type.component.css'],
    imports: [ImportsEditProductType],
})
export class EditProductComponent extends EditProductTypeFormController implements OnInit {

    constructor(
        private _productTypeService: ProductTypeService,
        private _fbMain: FormBuilder,
    ) { super(_fbMain) }

    ngOnInit(): void {
        this.formLoad();
        this.formLoadSegment();
        this.formLoadManufacturer();
        this.formLoadModel();
        this.products$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
    }
    //FormControls
    productTypeFormControl = new FormControl()
    segmentFormControl = new FormControl()
    manufacturerFormControl = new FormControl()
    modelFormControl = new FormControl()
    speedFormControl = new FormControl()
    capacityFormControl = new FormControl()
    descriptionFormControl = new FormControl()


    searchModel() {

    }

    searchManufacturer() {

    }

    searchSegment() {

    }

    searchProduct() {

    }




}
