import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"

export const ImportsFiledsInput:any[] =[
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    SubTitleComponent,
    TitleComponent
]
