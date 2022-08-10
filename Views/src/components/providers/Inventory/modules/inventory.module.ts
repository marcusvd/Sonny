import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InventoryCreateComponent } from 'src/components/providers/Inventory/components/inventory-create/inventory-create.component';
import { InventoryEditComponent } from 'src/components/providers/Inventory/components/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from 'src/components/providers/Inventory/components/inventory-list/inventory-list.component';
import { SalesInventory } from 'src/components/providers/Inventory/components/sales-inventory/sales-inventory';
import { InventoryRoutingModule } from 'src/components/providers/Inventory/modules/inventory.routing.module';
import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import {  InventoryCreateService } from "../services/inventory-create.service";
// import { InventoryListResolveOld } from "./resolvers/inventory-list.resolveOLD";
import { InventoryListService } from "../services/inventory-list.service";
import { InventoryEquipamentCreateComponent } from "src/components/providers/Inventory/components/inventory-equipament/inventory-equipament-create/inventory-equipament-create.component";
import { InventoryEquipamentService } from "../services/inventory-equipament.service";
import { InventoryCreateResolver } from "../resolvers/inventory-create.resolver";
import { InventoryEquipamentListService } from "../services/inventory-equipament-list.service";
import { InventoryListResolver } from "../components/inventory-list/resolvers/inventory-list.resolver";


@NgModule({
  declarations: [
    InventoryCreateComponent,
    InventoryListComponent,
    InventoryEditComponent,
    InventoryEquipamentCreateComponent,
    SalesInventory,

  ],
  imports: [
    //ANGULAR
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    //MY IMPORTS
   SharedModule,


    InventoryRoutingModule,
  ],
  exports: [
    InventoryRoutingModule,
    InventoryCreateComponent,
    InventoryListComponent,
  ],
  providers: [
    InventoryCreateService,
    InventoryListService,
    InventoryCreateResolver,
    InventoryEquipamentService,
    InventoryEquipamentListService,
    InventoryListResolver
  ]
})

export class InventoryModule { }
