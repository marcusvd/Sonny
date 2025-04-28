import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddProductTypeComponent } from "../product/add-product-type/add-product-type.component";
import { AddProductComponent } from "../product/add-product/add-product.component";
import { EditAllProductComponent } from "../product/edit-all-product-type/edit-all-product-type.component";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";

import { ListProductComponent } from "../product/list-product/list-product.component";
import { AddNewChildProductTypeComponent } from "../product/add-new-child-product-type/add-new-child-product-type.component";
import { EditSingleProductTypeComponent } from "../product/adit-single-product-type/edit-single-product-type.component";
import { DetailedProductComponent } from "../product/detailed-product/detailed-product.component";


// import { AddProductTypeComponent } from "../product-type/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      { path: 'add-product-type', component: AddProductTypeComponent },
      { path: 'edit-product-type', component: EditSingleProductTypeComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product-type-add-product', component: AddNewChildProductTypeComponent },
      { path: 'list-product', component: ListProductComponent },
      { path: 'detailed-product', component: DetailedProductComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
