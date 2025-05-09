import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule as MatCardModule } from "@angular/material/card"
import { MatFormFieldModule as MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule as MatInputModule } from "@angular/material/input"
import { SelectInputSearchGComponent } from "src/shared/components/select-input-search-g/select-input-search-g.component"

export const ImportsListFilterSearch: any[] = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    SelectInputSearchGComponent,
]
