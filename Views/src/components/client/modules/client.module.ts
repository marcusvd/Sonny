import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//Components

import { ClientListComponent } from 'src/components/client/client-list/component/client-list.component';
import { ClientRoutingModule } from "./client.routing.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { NavClientComponent } from "../nav-client/nav-client.component";
import { ClientCreateComponent } from "../client-create/component/client-create.component";
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
    //MY IMPORTS
    SharedModule,
    ClientRoutingModule,
  ],
  exports: [

  ],
  providers: [
  ],
})

export class ClientModule {

}
