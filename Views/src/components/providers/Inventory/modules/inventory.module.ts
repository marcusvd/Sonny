import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InventoryCreateComponent } from 'src/components/providers/Inventory/components/inventory-create/inventory-create.component';
import { InventoryListComponent } from 'src/components/providers/Inventory/components/inventory-list/inventory-list.component';
import { InventoryRoutingModule } from 'src/components/providers/Inventory/modules/inventory.routing.module';
import { SharedModule } from "src/shared/modules/shared.module";
import { InventoryListService } from "../services/inventory-list.service";
import { InventoryCreateResolver } from "../resolvers/inventory-create.resolver";
import { InventoryListResolver } from "../components/inventory-list/resolvers/inventory-list.resolver";
import { NavInventoryComponent } from "../components/nav-inventory/nav-inventory.component";
import { InventoryCreateService } from "../components/inventory-create/services/inventory-create.service";


@NgModule({
  declarations: [
    InventoryCreateComponent,
    InventoryListComponent,
    NavInventoryComponent

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
    NavInventoryComponent,
  ],
  providers: [
    InventoryCreateService,
    InventoryListService,
    InventoryCreateResolver,
    InventoryListResolver
  ]
})

export class InventoryModule { }
