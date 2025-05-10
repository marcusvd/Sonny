import { CommonModule } from "@angular/common"
import { MatCardModule as MatCardModule } from "@angular/material/card"
import { MatPaginatorModule as MatPaginatorModule } from "@angular/material/paginator"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"

import { MatIconModule } from "@angular/material/icon"
import { ContainerCardModelAComponent } from "src/components/stock-product/product/list-product/container-card-model-a/container-card-model-a.component"
import { BtnGDynamicComponent } from "src/shared/components/btn-g-dynamic/btn-g-dynamic.component"
import { ListGComponent } from "src/shared/components/list-g/list/list-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/default/sub-title.component"
import { TitleComponent } from "src/shared/components/title/default-title/title.component"
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
    BtnGDynamicComponent,
    ContainerCardModelAComponent
]
