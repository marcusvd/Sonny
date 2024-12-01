import { CommonModule } from "@angular/common"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { MatCardModule } from "@angular/material/card"
import { MatPaginatorModule } from "@angular/material/paginator"
import { GridListCommonSearchComponent } from "src/shared/components/grid-list-common/grid-list-common-search.component"
import { GridListCommonTableComponent } from "src/shared/components/grid-list-common/grid-list-common-table.component"
import { GridListCommonComponent } from "src/shared/components/grid-list-common/grid-list-common.component"

export const ImportsModulesComponentsListStock:any[] =[

    CommonModule,


     MatCardModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // CurrencyMaskModule,
    MatPaginatorModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,

    // GetSuppliersComponent
]
