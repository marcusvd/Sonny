import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Components
import { CustomerRoutingModule } from "./customer.routing.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { AddressComponent } from "src/shared/components/address/component/address.component";
import { CustomerCreateComponent } from "../components/customer-create/customer-create.component";
import { CustomerCreateService } from "../components/customer-create/services/customer-create.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { AddressService } from "src/shared/components/address/services/address.service";


@NgModule({
  declarations: [
    CustomerCreateComponent,
    // ClientListComponent,
    // ClientEditComponent,
    // ClientDetailsComponent,
    // TestComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //MY IMPORTS
    SharedModule,
    CustomerRoutingModule,
  ],
  exports: [],
  providers: [
    CustomerCreateService,
    ContactService,
    AddressService,
    // AddressComponent
  ],
})

export class CustomerModule {

}
