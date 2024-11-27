import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { ManufacturerComponent } from "./add-update-select-product/manufacturer/manufacturer.component"
import { ModelDescriptionComponent } from "./add-update-select-product/model/model-description.component"
import { ModelComponent } from "./add-update-select-product/model/model.component"
import { ProductComponent } from "./add-update-select-product/product/product.component"
import { SegmentComponent } from "./add-update-select-product/segment/segment.component"
import { AddItemProductComponent } from "../add-item-product/add-item-product.component"

export const ImportsModulesComponents:any[] =[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ProductComponent,
    SegmentComponent,
    ManufacturerComponent,
    ModelComponent,
    ModelDescriptionComponent,
    AddItemProductComponent
]
