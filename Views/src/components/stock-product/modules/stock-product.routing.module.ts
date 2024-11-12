import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockProductRouterComponent } from "../router-outlet/stock-product-router.component";
import { AddProductTypeComponent } from "../product-type/components/add/add-product-type.component";

const route: Routes = [

  {
    path: '', component: StockProductRouterComponent, children: [
      { path: 'add-product-type', component: AddProductTypeComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class StockProductRoutingModule { }
