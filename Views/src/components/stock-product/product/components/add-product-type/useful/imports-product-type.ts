import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { ProductInputComponent } from "../../../common-components/fields-input/product/product-input.component"
import { SegmentInputComponent } from "../../../common-components/fields-input/segment/segment-input.component"
import { ManufacturerInputComponent } from "../../../common-components/fields-input/manufacturer/manufacturer-input.component"
import { ModelInputComponent } from "../../../common-components/fields-input/model/model-input.component"
import { ModelInputDescriptionComponent } from "../../../common-components/fields-input/model/model-input-description.component"



export const ImportsProductType:any[] =[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ProductInputComponent,
    SegmentInputComponent,
    ManufacturerInputComponent,
    ModelInputComponent,
    ModelInputDescriptionComponent,
]
