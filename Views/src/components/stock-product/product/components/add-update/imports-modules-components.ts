import { CommonModule } from "@angular/common"
import { FlexLayoutModule } from "@angular/flex-layout"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { AddUpdateProductGetMatSelectSingleComponent } from "./add-update-select-product/add-update-product/add-update-product-get-mat-select-single.component"
import { AddUpdateProductInputComponent } from "./add-update-input-product/add-update-product/add-update-product-input.component"
import { AddUpdateSegmentInputComponent } from "./add-update-input-product/add-update-segment/add-update-segment-input.component"
import { AddUpdateSegmentMatSelectSingleComponent } from "./add-update-select-product/add-update-segment/add-update-segment-mat-select-single.component"
import { AddUpdateManufacturerInputComponent } from "./add-update-input-product/add-update-manufacturer/add-update-manufacturer-input.updcomponent"
import { AddUpdateManufacturerMatSelectSingleComponent } from "./add-update-select-product/add-update-manufacturer/add-update-manufacturer-mat-select-single.component"
import { AddUpdateModelInputComponent } from "./add-update-input-product/add-update-model/add-update-model-input.component"
import { AddUpdateModelMatSelectSingleComponent } from "./add-update-select-product/add-update-model/add-update-model-mat-select-single.component"
import { ModelDescriptionComponent } from "./add-update-select-product/add-update-model/model-description.component"

export const ImportsModulesComponents:any[] =[
    CommonModule,
    // FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    AddUpdateProductGetMatSelectSingleComponent,
    AddUpdateProductInputComponent,
    AddUpdateSegmentInputComponent,
    AddUpdateSegmentMatSelectSingleComponent,
    AddUpdateManufacturerInputComponent,
    AddUpdateManufacturerMatSelectSingleComponent,
    AddUpdateModelInputComponent,
    AddUpdateModelMatSelectSingleComponent,
    ModelDescriptionComponent
]
