import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatInputModule as MatInputModule } from "@angular/material/input"
import { MatSelectModule as MatSelectModule } from "@angular/material/select"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"

export const ImportsFiledsSelect:any[] =[
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule
]
