import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatPaginatorModule } from "@angular/material/paginator"


import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"

import { BtnFilterGComponent } from "src/shared/components/btn-filter-g/btn-filter-g.component"
import { CardContentComponent } from "src/shared/components/card-g/card-content/card-content.component"
import { CardFooterComponent } from "src/shared/components/card-g/card-footer/card-footer.component"
import { CardHeaderComponent } from "src/shared/components/card-g/card-header/card-header.component"
import { ListCardGComponent } from "src/shared/components/list-g/list-card-g/list-card-g.component"
import { ListGComponent } from "src/shared/components/list-g/list/list-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { FilterProductListComponent } from "../filter-search-product-list/filter-product-list.component"
import { ProductCardComponent } from "../lis-product-small-screen/product-card.component"

export const ImportsListProduct:any[] =[
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ListGComponent,
    FilterProductListComponent,
    BtnFilterGComponent,
    ListCardGComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    ProductCardComponent

]
