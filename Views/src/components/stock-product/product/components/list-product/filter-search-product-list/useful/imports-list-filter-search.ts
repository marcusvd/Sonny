import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { FieldSelectGComponent } from "src/components/stock-product/product/common-components/fields-select/field-select-g/field-select-g.component"

export const ImportsListFilterSearch: any[] = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FieldSelectGComponent,
]
