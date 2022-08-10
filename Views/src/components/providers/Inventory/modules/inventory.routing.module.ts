import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "../components/inventory-create/inventory-create.component";
import { InventoryEditComponent } from "../components/inventory-edit/inventory-edit.component";
import { InventoryEquipamentCreateComponent } from "../components/inventory-equipament/inventory-equipament-create/inventory-equipament-create.component";

import { InventoryListComponent } from "../components/inventory-list/inventory-list.component";
import { InventoryListResolver } from "../components/inventory-list/resolvers/inventory-list.resolver";
import { InventoryCreateResolver } from "../resolvers/inventory-create.resolver";
//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const routeInventory: Routes = [
  { path: 'createinventory', component: InventoryCreateComponent, resolve: { loaded: InventoryCreateResolver } },
  { path: 'iteminventory', component: InventoryEquipamentCreateComponent },
  { path: 'inventories', component: InventoryListComponent, resolve:{loaded: InventoryListResolver} },
  //, resolve: { FullLoaded: InventoryListResolve }
  // { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(routeInventory)],
  exports: [RouterModule]
})


export class InventoryRoutingModule { }
