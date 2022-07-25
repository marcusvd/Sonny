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
import {  InventoryCreateService } from "./services/inventory-create.service";
// import { InventoryListResolveOld } from "./resolvers/inventory-list.resolveOLD";
import { InventoryListService } from "./services/inventory-list.service";
import { InventoryEquipamentCreateComponent } from "src/app/_components/administrative/local/providers/Inventory/inventory-equipament/inventory-equipament-create/inventory-equipament-create.component";
import { InventoryEquipamentService } from "./services/inventory-equipament.service";
import { InventoryCreateResolver } from "./resolvers/inventory-create.resolver";
import { InventoryEquipamentListService } from "./services/inventory-equipament-list.service";
import { InventoryListResolver } from "./inventory-list/resolvers/inventory-list.resolver";


@NgModule({
  declarations: [
    InventoryCreateComponent,
    InventoryListComponent,
    InventoryEditComponent,
    InventoryEquipamentCreateComponent,
    SalesInventory,

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
   // TableGInventoryComponent,
    MaterialModule,
  ],
  providers: [
    InventoryCreateService,
    InventoryListService,
    InventoryCreateResolver,
    InventoryEquipamentService,
    InventoryEquipamentListService,
    InventoryCreateResolver,
    InventoryListResolver
  ]
})

export class InventoryModule { }
