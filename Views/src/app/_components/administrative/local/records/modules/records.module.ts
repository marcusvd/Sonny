import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { InventoryModule } from "../../providers/Inventory/inventory.module";
import { SupplierModule } from "../../providers/supplier/supplier.module";
import { RecordsComponent } from "../records.component";

import { RecordsRoutingModule } from "./records.routing.module";
import { PartnerCreateComponent } from 'src/app/_components/administrative/local/out-sourced/partner-create/partner-create.component';
import { PartnerModule } from "../../out-sourced/partner.module";
import { ClientModule } from "../../../client/client.module";


@NgModule({
  declarations: [RecordsComponent],
  imports:
    [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      RecordsRoutingModule,
      //My
      MaterialModule,
      SharedModule,
      InventoryModule,
      SupplierModule,
      PartnerModule,
      ClientModule


    ],
  exports: [RecordsComponent],
  providers: []
})
export class RecordsModule {

}
