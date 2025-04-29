import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"


import { MatSelectModule } from "@angular/material/select"
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { InputFieldGComponent } from "src/shared/components/input-field-g/input-field-g.component"
import { SelectInputSearchGComponent } from "src/shared/components/select-input-search-g/select-input-search-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/default/sub-title.component"
import { TitleComponent } from "src/shared/components/title/default-title/title.component"



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
    InputFieldGComponent,
    SelectInputSearchGComponent,

]
