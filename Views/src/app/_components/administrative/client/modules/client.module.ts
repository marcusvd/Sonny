import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//Components

import { ClientListComponent } from 'src/app/_components/administrative/client/client-list/client-list.component';
import { ClientRoutingModule } from "./client.routing.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { ClientCreateService } from "../services/client-create.service";
import { ClientListService } from "../services/client-list.service";
import { NavClientComponent } from "../nav-client/nav-client.component";
import { ClientCreateComponent } from "../client-create/component/client-create.component";
import { AddressService } from "src/app/_shared/components/address/services/address.service";
import { ClientEditComponent } from "../client-edit/client-edit.component";


@NgModule({
  declarations: [

    ClientListComponent,
    ClientEditComponent,
    ClientCreateComponent,
    NavClientComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //My
    SharedModule,
    MaterialModule,
    ClientRoutingModule
  ],
  exports: [

  ],
  providers: [
  ],
})

export class ClientModule {

}
