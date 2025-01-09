import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatPaginatorModule } from "@angular/material/paginator"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"

import { MatIconModule } from "@angular/material/icon"
import { ContainerCardModelAComponent } from "src/components/stock-product/product/components/list-product/container-card-model-a/container-card-model-a.component"
import { BtnFilterGComponent } from "src/shared/components/btn-filter-g/btn-filter-g.component"
import { ListGComponent } from "src/shared/components/list-g/list/list-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { FilterProductListComponent } from "../filter-search-product-list/filter-product-list.component"

export const ImportsListProduct:any[] =[
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ListGComponent,
    FilterProductListComponent,
    BtnFilterGComponent,
    ContainerCardModelAComponent
    // ListCardGComponent,
    // HeaderCardModelAComponent,
    // ContentCardModelAComponent,
    // FooterCardModelAComponent,
    // LineDividerCardModelAComponent

]
