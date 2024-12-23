import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddProductTypeComponent } from "../product/components/add-product-type/add-product-type.component";
import { AddProductComponent } from "../product/components/add-product/add-product.component";
import { EditProductComponent } from "../product/components/edit-product-type/edit-product-type.component";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";

import { TestsComponent } from "src/shared/tests/tests.component";
import { ListProductComponent } from "../product/components/list-product/list-product.component";
import { CardGComponent } from "src/shared/components/card-g/card-container/card-g.component";
// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      { path: 'add-product-type', component: AddProductTypeComponent },
      { path: 'edit-product-type', component: EditProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'list-product', component: ListProductComponent },
      //  { path: 'card', component: CardGComponent },
       { path: 'card', component: TestsComponent },
      //  { path: 'add-item-product', component: AddProductTypeComponent},
      //  { path: 'add-item-product', component: ProductMainAddComponent},
      //  { path: 'add-item-product', component: EditProductComponent},
      //  { path: 'add-product', component: AddStockItemComponent},
      // { path: 'list-product', component: ListStockComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
