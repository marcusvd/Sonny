import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";
import { AddProductTypeComponent } from "../product/components/add-product-type/add-product-type.component";
import { EditProductComponent } from "../product/components/edit-product-type/edit-product-type.component";
// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
     { path: 'add-product-type', component: AddProductTypeComponent},
      //  { path: 'add-update-product', component: AddUpdateProductComponent},
       { path: 'add-item-product', component: EditProductComponent},
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
