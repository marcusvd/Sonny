import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDashComponent } from "../dash/product-dash.component";
import { ProductCreateResolver } from "../resolvers/product-create.resolver";
import { ManufacturerEquipamentNameComponent } from "../add/manufacturer-equipament-name/manufacturer-equipament-name.component";
import { ProductListComponent } from "../list/product-list.component";
import { ProductCreateComponent } from "../add/product-create.component";


//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const route: Routes = [

  {
    path: '', component: ProductDashComponent, children: [
      { path: 'add-product/:id', component: ProductCreateComponent, resolve: { loaded: ProductCreateResolver } },
      { path: 'add-manufacturer-name/:id', component: ManufacturerEquipamentNameComponent, resolve: { loaded: ProductCreateResolver } },
      { path: 'list-product/:id', component: ProductListComponent, resolve: { loaded: ProductCreateResolver } },
      // { path: 'list-stock/:id', component: StockListComponent, resolve: { loaded: StockListResolver } },
      // { path: 'inventories', component: InventoryListComponent, resolve: { loaded: InventoryListResolver } },
    ]
  },

  //, resolve: { FullLoaded: InventoryListResolve }
  // { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})


export class ProductRoutingModule { }
