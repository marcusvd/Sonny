import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "../components/inventory-create/inventory-create.component";
import { InventoryListComponent } from "../components/inventory-list/inventory-list.component";
import { InventoryListResolver } from "../components/inventory-list/resolvers/inventory-list.resolver";
import { NavInventoryComponent } from "../components/nav-inventory/nav-inventory.component";
import { InventoryCreateResolver } from "../resolvers/inventory-create.resolver";
//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const routeInventory: Routes = [
  { path: 'inventories', component: InventoryListComponent, resolve: { loaded: InventoryListResolver } },
  {
    path: 'navinventory', component: NavInventoryComponent, children: [
      { path: 'createinventory', component: InventoryCreateComponent, resolve: { loaded: InventoryCreateResolver } }
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
