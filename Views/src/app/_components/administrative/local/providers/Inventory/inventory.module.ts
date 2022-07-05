import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InventoryCreateComponent } from 'src/app/_components/administrative/local/providers/Inventory/inventory-create/inventory-create.component';
import { InventoryEditComponent } from 'src/app/_components/administrative/local/providers/Inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from 'src/app/_components/administrative/local/providers/Inventory/inventory-list/inventory-list.component';
import { SalesInventory } from 'src/app/_components/administrative/local/providers/Inventory/sales-inventory/sales-inventory';
import { InventoryRoutingModule } from 'src/app/_components/administrative/local/providers/Inventory/inventory.routing.module';
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { CategoryInventoryCrudService, InventoryCreateService, SupplierInventoryCrudService } from "./services/inventory-create.service";
import { InventoryEditResolver } from "./inventory-edit.resolver";
import { InventoryListResolve } from "./resolvers/inventory-list.resolve";
import { InventoryListService } from "./services/inventory-list.service";
import { InventoryItemCreateComponent } from "src/app/_components/administrative/local/providers/Inventory/inventory-items/inventory-item-create/inventory-item-create.component";
import { InventoryItemService } from "./services/inventory-item.service";


@NgModule({
  declarations: [
    InventoryCreateComponent,
    InventoryListComponent,
    InventoryEditComponent,
    InventoryItemCreateComponent,
    SalesInventory
  ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //My
    MaterialModule,
    SharedModule,

    InventoryRoutingModule,
  ],
  exports: [
    InventoryRoutingModule,
    InventoryCreateComponent,
    MaterialModule,
  ],
  providers: [
    InventoryCreateService,
    CategoryInventoryCrudService,
    SupplierInventoryCrudService,
    InventoryEditResolver,
    InventoryListService,
    InventoryListResolve,
    InventoryItemService,
  ]
})

export class InventoryModule { }
