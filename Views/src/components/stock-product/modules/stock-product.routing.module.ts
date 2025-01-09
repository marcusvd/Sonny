import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddProductTypeComponent } from "../product/components/add-product-type/add-product-type.component";
import { AddProductComponent } from "../product/components/add-product/add-product.component";
import { EditProductComponent } from "../product/components/edit-product-type/edit-product-type.component";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";

import { ListProductComponent } from "../product/components/list-product/list-product.component";
import { AddNewChildProductTypeComponent } from "../product/components/add-new-child-product-type/add-new-child-product-type.component";


// import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";


const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      { path: 'add-product-type', component: AddProductTypeComponent },
      { path: 'edit-product-type', component: EditProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product-type-add-product', component: AddNewChildProductTypeComponent },
      { path: 'list-product', component: ListProductComponent },

    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
