import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "./inventory-create/inventory-create.component";
import { InventoryEditComponent } from "./inventory-edit/inventory-edit.component";
import { InventoryItemCreateComponent } from "./inventory-items/inventory-item-create/inventory-item-create.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryListResolve } from "./resolvers/inventory-list.resolve";


const routeInventory: Routes = [
  { path: 'createinventory', component: InventoryCreateComponent },
  { path: 'iteminventory', component: InventoryItemCreateComponent },
  { path: 'inventories', component: InventoryListComponent, resolve: { FullLoaded: InventoryListResolve } },
 // { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(routeInventory)],
  exports: [RouterModule]
})


export class InventoryRoutingModule { }
