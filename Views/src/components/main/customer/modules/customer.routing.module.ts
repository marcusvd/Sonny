import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CustomersListComponent } from "../components/list/customers-list.component";
import { CustomerCreateComponent } from "../components/add/customer-create.component";
import { CustomerViewComponent } from "../components/view/customer-view.component";
import { CustomerEditComponent } from "../components/edit/customer-edit.component";



const routes: Routes = [
  { path: 'create', component: CustomerCreateComponent },
  { path: 'view/:id', component: CustomerViewComponent },
  { path: 'edit/:id', component: CustomerEditComponent },
  { path: 'list/:id', component: CustomersListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomerRoutingModule {

}
