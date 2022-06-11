import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "./inventory-create/inventory-create.component";
import { InventoryEditResolver } from "./inventory-edit.resolver";
import { InventoryEditComponent } from "./inventory-edit/inventory-edit.component";
//import { InventoryDetailsComponent } from "./inventory-details/inventory-details.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryListResolve } from "./resolvers/inventory-list.resolve";


const routeInventory: Routes = [
  { path: 'create', component: InventoryCreateComponent },
  { path: 'inventories', component: InventoryListComponent, resolve: { FullLoaded: InventoryListResolve } },
  { path: ':id/edit', component: InventoryEditComponent, resolve: { CatEdit: InventoryEditResolver } },
]

@NgModule({
  imports: [RouterModule.forChild(routeInventory)],
  exports: [RouterModule]
})


export class InventoryRoutingModule { }
