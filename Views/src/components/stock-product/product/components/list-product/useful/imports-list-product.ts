import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"


import { MatPaginatorModule } from "@angular/material/paginator"
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { ListGComponent } from "src/shared/components/list-g/list-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { FilterProductListComponent } from "../filter-search-product-list/filter-product-list.component"
// import { SearchProductListComponent } from "../filter-search-product-list/search-product-list.component"
import { BtnFilterGComponent } from "src/shared/components/btn-filter-g/btn-filter-g.component"

export const ImportsListProduct:any[] =[
    // MatDatepickerModule,
    CommonModule,
    // MatFormFieldModule,
    // MatInputModule,
    MatCardModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // ReactiveFormsModule,
    // CurrencyMaskModule,
    MatPaginatorModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    ListGComponent,
    // SearchProductListComponent,
    FilterProductListComponent,
    BtnFilterGComponent

]
