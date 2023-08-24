import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Components
import { CustomerRoutingModule } from "./customer.routing.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { AddressComponent } from "src/shared/components/address/component/address.component";
import { CustomerCreateComponent } from "../add/customer-create.component";
import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
import { CustomersListComponent } from "../components/customers-list/customers-list.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerDashComponent,
    CustomersListComponent,
    // ClientEditComponent,
    // TestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //MY IMPORTS
    SharedModule,
    CustomerRoutingModule,
  ],
  exports: [
    CustomerCreateComponent,
    CustomerDashComponent,
    CustomersListComponent,
  ],
  providers: [
    // CustomerCreateService,
    // ContactService,
    // AddressService,
    // AddressComponent
  ],
})

export class CustomerModule {

}
