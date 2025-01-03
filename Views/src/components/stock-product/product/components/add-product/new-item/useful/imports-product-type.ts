import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { MatSelectModule } from "@angular/material/select"
import { FieldInputGComponent } from "src/components/stock-product/product/common-components/fields-input/field-input-g/field-input-g.component"
import { FieldSelectGComponent } from "src/components/stock-product/product/common-components/fields-select/field-select-g/field-select-g.component"



export const ImportsProductType:any[] =[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    FieldInputGComponent,
    FieldSelectGComponent,
]
