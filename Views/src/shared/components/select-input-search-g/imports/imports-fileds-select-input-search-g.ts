import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input"
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"

export const ImportsFiledsSelect:any[] =[
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
]
