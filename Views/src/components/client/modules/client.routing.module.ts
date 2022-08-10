import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientCreateComponent } from "../client-create/component/client-create.component";
import { ClientListComponent } from "../client-list/client-list.component";
import { DevicesListComponent } from "../technician/infra/devices/devices-list/devices-list.component";

const routes: Routes = [
  { path: 'create', component: ClientCreateComponent },
  { path: 'clientlist', component: ClientListComponent },
  { path: 'dashdevices/1', component: DevicesListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ClientRoutingModule {

}
