import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card"
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field"
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input"
import { SelectInputSearchGComponent } from "src/shared/components/select-input-search-g/select-input-search-g.component"

export const ImportsListFilterSearch: any[] = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    SelectInputSearchGComponent,
]
