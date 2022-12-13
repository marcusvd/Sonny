import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CustomerCreateComponent } from "../components/customer-create/customer-create.component";
import { CustomerNavComponent } from "../components/customer-nav/customer-nav.component";


// import { ClientDetailsComponent } from "../client-details/component/client-details.component";
// import { ClientListComponent } from "../client-list/component/client-list.component";


const routes: Routes = [
  {
    path: 'customer-nav', component: CustomerNavComponent, children: [
      { path: 'create', component: CustomerCreateComponent }
    ]
  },

  // ,
  // { path: 'clientlist', component: ClientListComponent },
  // { path: 'clientlist', component: ClientListComponent },
  // { path: 'tests', component: ContactComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomerRoutingModule {

}
