import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule as MatCardModule } from "@angular/material/card"
import { MatCheckboxModule as MatCheckboxModule } from "@angular/material/checkbox"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatFormFieldModule as MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule as MatInputModule } from "@angular/material/input"
import { CurrencyMaskModule } from "ng2-currency-mask"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { GetSuppliersComponent } from "src/shared/components/get-entities/partner-supplier/get-supliers.component"
import { SubTitleComponent } from "src/shared/components/sub-title/default/sub-title.component"
import { TitleComponent } from "src/shared/components/title/default-title/title.component"

import { DateTimeFieldGComponent } from "src/shared/components/date-time-field-g/date-time-field-g.component"
import { InputFieldGComponent } from "src/shared/components/input-field-g/input-field-g.component"
import { SelectInputSearchGComponent } from "src/shared/components/select-input-search-g/select-input-search-g.component"
import { AddNewChildProductTypeComponent } from "../../add-new-child-product-type/add-new-child-product-type.component"

export const ImportsAddProduct:any[] =[
    MatDatepickerModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    AddNewChildProductTypeComponent,
    ReactiveFormsModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    GetSuppliersComponent,
    DateTimeFieldGComponent,
    InputFieldGComponent,
    SelectInputSearchGComponent,
]
