import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatPaginatorModule } from "@angular/material/paginator"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"

import { BtnFilterGComponent } from "src/shared/components/btn-filter-g/btn-filter-g.component"
import { ListCardGComponent } from "src/shared/components/list-g/list-card-g/list-card-g.component"
import { ListGComponent } from "src/shared/components/list-g/list/list-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { FilterProductListComponent } from "../filter-search-product-list/filter-product-list.component"
import { FooterCardModelAComponent } from "src/shared/components/card-g/card-g-model-a/footer-card-model-a/footer-card-model-a.component"
import { HeaderCardModelAComponent } from "src/shared/components/card-g/card-g-model-a/header-card-model-a/header-card-model-a.component"
import { ContentCardModelAComponent } from "src/shared/components/card-g/card-g-model-a/content-card-model-a/content-card-model-a.component"
import { LineDividerCardModelAComponent } from "src/shared/components/card-g/card-g-model-a/card-line-divider-model-a-line/line-divider-card-model-a-line.component"
import { MatIconModule } from "@angular/material/icon"

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
    ListCardGComponent,
    HeaderCardModelAComponent,
    ContentCardModelAComponent,
    FooterCardModelAComponent,
    LineDividerCardModelAComponent

]
