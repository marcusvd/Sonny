import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"


import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button"
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card"
import { MatDividerModule } from "@angular/material/divider"
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input"
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio"
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
