import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { AddressComponent } from "../component/address.component";
import { AddressService } from "../services/address.service";



@NgModule({
  declarations:[
    AddressComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    //My

    MaterialModule,

  ],
  exports:[
    AddressComponent
  ],
  providers:[
    AddressService
  ]
})


export class AddressModule{

}
