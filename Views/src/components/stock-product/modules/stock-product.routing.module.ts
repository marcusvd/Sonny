import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";
import { ProductMainAddComponent } from "../product/components/product-main.component";
import { ListStockComponent } from "../product/components/list-stock/list-stock.component";
// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      // { path: 'add-product-type', component: AddProductTypeComponent},
      //  { path: 'add-update-product', component: AddUpdateProductComponent},
       { path: 'add-update-product', component: ProductMainAddComponent},
      { path: 'list-product', component: ListStockComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
