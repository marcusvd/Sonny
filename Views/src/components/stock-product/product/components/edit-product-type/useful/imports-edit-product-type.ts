import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"


import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatDividerModule } from "@angular/material/divider"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatRadioModule } from "@angular/material/radio"
import { DescriptionFieldComponent } from "src/shared/components/administrative/info/description-field.component"
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { ArrayGComponent } from "../../../common-components/array-g/array-g.component"
import { FieldSelectGComponent } from "../../../common-components/fields-select/field-select-g/field-select-g.component"

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
    DescriptionFieldComponent,
    FieldSelectGComponent,
    ArrayGComponent
]
