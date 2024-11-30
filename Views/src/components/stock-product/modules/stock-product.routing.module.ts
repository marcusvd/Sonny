import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import ProductMainAddComponent from "../product/components/product-main.component";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";
// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      // { path: 'add-product-type', component: AddProductTypeComponent},
      //  { path: 'add-update-product', component: AddUpdateProductComponent},
       { path: 'add-update-product', component: ProductMainAddComponent},
      //{ path: 'add-update-product', component: AddItemProductComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
