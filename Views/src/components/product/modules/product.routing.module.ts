import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ProductDashComponent } from "../components/dash/product-dash.component";
import { ProductListComponent } from "../components/list/product-list.component";
import { ProductCreateComponent } from "../components/add/product-create.component";
import { AddResolver, LengthProductResolver, LengthQuantitiesProductResolver } from "../resolvers/product.resolver";
import { ReserveSellListComponent } from "../components/reserve-sell-list/reserve-sell-list.component";
import { ItemHardwareLinkedComponent } from "../components/add/item-hardware-linked/item-hardware-linked.component";


//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const route: Routes = [

  {
    path: '', component: ProductDashComponent, children: [
      { path: 'add-item/:id', component: ItemHardwareLinkedComponent },
      { path: 'add-product/:id', component: ProductCreateComponent, resolve: { loaded: AddResolver } },
      { path: 'list-product/:id', component: ProductListComponent, resolve:{loaded: LengthProductResolver} },
      { path: 'reserve-sell-product/:id', component: ReserveSellListComponent, resolve:{loaded:LengthQuantitiesProductResolver}},
      // , resolve:{loaded: LengthResolver}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})


export class ProductRoutingModule { }
