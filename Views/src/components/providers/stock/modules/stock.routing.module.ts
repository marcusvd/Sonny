import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockDashComponent } from "../components/stock-dash/stock-dash.component";
import { StockCreateComponent } from "../components/stock-create/stock-create.component";
import { StockCreateResolver } from "../components/stock-create/resolvers/stock-create.resolver";
import { StockListComponent } from "../components/stock-list/stock-list.component";
import { StockListResolver } from "../components/stock-list/resolver/stock-list.resolver";

//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const routeInventory: Routes = [

  {
    path: '', component: StockDashComponent, children: [
      { path: 'create-stock', component: StockCreateComponent, resolve: { loaded: StockCreateResolver } },
      { path: 'list-stock/:id', component: StockListComponent, resolve: { loaded: StockListResolver } },
      // { path: 'inventories', component: InventoryListComponent, resolve: { loaded: InventoryListResolver } },
    ]
  },

  //, resolve: { FullLoaded: InventoryListResolve }
  // { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(routeInventory)],
  exports: [RouterModule]
})


export class StockRoutingModule { }
