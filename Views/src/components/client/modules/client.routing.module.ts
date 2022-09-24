import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ClientCreateComponent } from "../client-create/component/client-create.component";
import { ClientDetailsComponent } from "../client-details/component/client-details.component";
import { ClientListComponent } from "../client-list/component/client-list.component";
import { DevicesListComponent } from "../technician/infra/devices/devices-list/devices-list.component";
import { TestComponent } from "../test/test.component";

const routes: Routes = [
  { path: 'create', component: ClientCreateComponent },
  { path: 'clientlist', component: ClientListComponent },
  { path: 'clientlist', component: ClientListComponent },
  { path: 'tests', component: TestComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ClientRoutingModule {

}
