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
import { InputFieldGComponent } from "src/shared/components/input-field-g/input-field-g.component"
import { SelectInputSearchGComponent } from "src/shared/components/select-input-search-g/select-input-search-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/default/sub-title.component"
import { TitleComponent } from "src/shared/components/title/default-title/title.component"
import { ArrayGComponent } from "../array/array-g.component"


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
    ArrayGComponent,
    InputFieldGComponent,
    SelectInputSearchGComponent,
]
