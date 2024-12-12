import { CommonModule } from "@angular/common"
import { FlexLayoutModule } from "@angular/flex-layout"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { CurrencyMaskModule } from "ng2-currency-mask"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { GetSuppliersComponent } from "src/shared/components/get-entities/partner-supplier/get-supliers.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { DateTimeGComponent } from "../../../common-components/date-time-g/date-time-g.component"
import { FieldInputGComponent } from "../../../common-components/fields-input/field-input-g/field-input-g.component"
import { FieldSelectGComponent } from "../../../common-components/fields-select/field-select-g/field-select-g.component"
import { ListGComponent } from "src/shared/components/list-g/list-g.component"
import { MatPaginatorModule } from "@angular/material/paginator"

export const ImportsListProduct:any[] =[
    // MatDatepickerModule,
    CommonModule,
    // MatFormFieldModule,
    // MatInputModule,
    MatCardModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // CurrencyMaskModule,
    MatPaginatorModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ListGComponent
    
]
