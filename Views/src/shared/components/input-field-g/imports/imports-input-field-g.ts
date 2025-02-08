import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { CurrencyMaskModule } from "ng2-currency-mask"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/default-title/title.component"


export const ImportsFiledsInput:any[] =[
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    SubTitleComponent,
    TitleComponent,
    CurrencyMaskModule,
    
]
