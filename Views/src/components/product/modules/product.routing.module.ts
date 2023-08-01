import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const route: Routes = [

  // {
  //   path: '', component: StockDashComponent, children: [
  //     { path: 'create-stock/:id', component: StockCreateComponent, resolve: { loaded: StockCreateResolver } },
  //     { path: 'list-stock/:id', component: StockListComponent, resolve: { loaded: StockListResolver } },
  //     // { path: 'inventories', component: InventoryListComponent, resolve: { loaded: InventoryListResolver } },
  //   ]
  // },

  //, resolve: { FullLoaded: InventoryListResolve }
  // { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})


export class ProductRoutingModule { }
