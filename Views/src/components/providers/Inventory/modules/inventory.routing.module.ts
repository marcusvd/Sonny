import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "../components/inventory-create/inventory-create.component";
import { InventoryDashComponent } from "../components/inventory-dash/inventory-dash.component";
import { InventoryCreateResolver } from "../resolvers/inventory-create.resolver";
//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const routeInventory: Routes = [

  {
    path: '', component: InventoryDashComponent, children: [
      { path: 'create-inventory', component: InventoryCreateComponent, resolve: { loaded: InventoryCreateResolver } },
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


export class InventoryRoutingModule { }
