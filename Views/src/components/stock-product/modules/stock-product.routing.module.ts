import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";
import { AddUpdateProductComponent } from "../product/components/add-update/add-update-product.component";
import { AddItemProductComponent } from "../product/components/add-item-product/add-item-product.component";
// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      // { path: 'add-product-type', component: AddProductTypeComponent},
      // { path: 'add-update-product', component: AddUpdateProductComponent},
      { path: 'add-update-product', component: AddItemProductComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
