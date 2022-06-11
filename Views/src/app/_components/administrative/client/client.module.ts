import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//Components
import { ClientCreateComponent } from 'src/app/_components/administrative/client/client-create/client-create.component';
import { ClientListComponent } from 'src/app/_components/administrative/client/client-list/client-list.component';
import { ClientEditComponent } from 'src/app/_components/administrative/client/client-edit/client-edit.component';

import { ClientRoutingModule } from "./client.routing.module";
//import { SideNavComponent } from "src/app/_shared/components/side-nav/side-nav.component"
// import { MaterialModule } from "src/app/_shared/modules/material.module";
//Modules
// import { BackButtonComponent } from "src/app/_shared/components/back-button/back-button.component";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { ClientCreateService} from "./services/client-create.service";
import { ClientListService } from "./services/client-list.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { NavClientComponent } from "./nav-client/nav-client.component";
// import { InventoryModule } from "../local/providers/Inventory/inventory.module";
// import { SupplierModule } from "../local/providers/supplier/supplier.module";
// import { PartnerModule } from "../local/out-sourced/partner.module";
// import { FinancialModule } from "../local/financial/financial.module";
// import { CollectModule } from "../services/collect.module";

@NgModule({
  declarations: [

    ClientListComponent,
    ClientEditComponent,

    ClientCreateComponent,
    NavClientComponent
    //SideNavComponent,clientmain/clientlistupd

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //My
    SharedModule,
    MaterialModule,
    ClientRoutingModule
  ],
  exports: [ClientCreateComponent],
  providers: [ClientCreateService, ClientListService],
})

export class ClientModule {

}
