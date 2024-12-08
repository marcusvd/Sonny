import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"


import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatDividerModule } from "@angular/material/divider"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatRadioModule } from "@angular/material/radio"
import { DescriptionFieldComponent } from "src/shared/components/administrative/info/description-field.component"
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { ManufacturerSelectComponent } from "../../../common-components/fields-select/manufacturer/manufacturer-select.component"
import { ModelSelectComponent } from "../../../common-components/fields-select/model/model-select.component"
import { ProductSelectComponent } from "../../../common-components/fields-select/product/product-select.component"
import { SegmentSelectComponent } from "../../../common-components/fields-select/segment/segment-select.component"
import { EditChecksComponent } from "../edit-checks/edit-checks.component"
import { MatIconModule } from "@angular/material/icon"
import { FieldSelectGComponent } from "../../../common-components/fields-select/field-select-g/field-select-g.component"
import { ArrayGComponent } from "../../../common-components/array-g/array-g.component"

export const ImportsEditProductType: any[] = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDividerModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    EditChecksComponent,
    ProductSelectComponent,
    SegmentSelectComponent,
    ManufacturerSelectComponent,
    ModelSelectComponent,
    DescriptionFieldComponent,
    FieldSelectGComponent,
    ArrayGComponent
]
