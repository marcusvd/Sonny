import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientCreateComponent } from "./client-create/client-create.component";
import { ClientListComponent } from "./client-list/client-list.component";
import { NavClientComponent } from "./nav-client/nav-client.component";
import { DevicesListComponent } from "./technician/infra/devices/devices-list/devices-list.component";


const clientRoutes: Routes = [
  { path: 'clientmain', component: NavClientComponent, children:[
    { path: 'create', component: ClientCreateComponent },
    { path: 'clientlist', component: ClientListComponent },
    // { path: 'clientlistupd', component: ClientListComponent },

    { path: 'dashdevices/1', component: DevicesListComponent },
    { path: 'new/client', component: ClientCreateComponent },
    // { path: 'deviceslist/:id/list', component: DevicesListComponent },
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule],
  providers: []
})


export class ClientRoutingModule {

}
