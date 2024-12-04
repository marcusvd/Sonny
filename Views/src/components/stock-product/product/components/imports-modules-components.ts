import { CommonModule } from "@angular/common"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { AddItemProductComponent } from "./add-item-product/add-item-product.component"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { AddStockItemComponent } from "./add-stock-item/add-stock-item.component"

export const ImportsModulesComponents:any[] =[

    CommonModule,


     MatCardModule,
    MatCheckboxModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    AddStockItemComponent,
    AddItemProductComponent

    // GetSuppliersComponent
]
