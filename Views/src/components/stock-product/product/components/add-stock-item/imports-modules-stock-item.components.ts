import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { ProductComponent } from "./fields/product/product.component"
import { SegmentComponent } from "./fields/segment/segment.component"
import { ManufacturerComponent } from "./fields/manufacturer/manufacturer.component"
import { ModelComponent } from "./fields/model/model.component"
// import { AddItemProductComponent } from "../add-item-product/add-item-product.component"
import { ModelDescriptionComponent } from "./fields/model/model-description.component"

export const ImportsModulesComponentsStockItem:any[] =[
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
    // AddItemProductComponent
]
