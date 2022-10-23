import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressComponent } from "src/shared/components/address/component/address.component";

import { ClientCreateComponent } from "../client-create/component/client-create.component";
import { ClientDetailsComponent } from "../client-details/component/client-details.component";
import { ClientListComponent } from "../client-list/component/client-list.component";


const routes: Routes = [
  { path: 'create', component: ClientCreateComponent },
  { path: 'clientlist', component: ClientListComponent },
  { path: 'clientlist', component: ClientListComponent },
  { path: 'tests', component: AddressComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ClientRoutingModule {

}
