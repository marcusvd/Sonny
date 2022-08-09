import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { ContactComponent } from "../component/contact.component";
import { ContactService } from "../services/contact.service";


@NgModule({
  declarations:[
    ContactComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    //My

    MaterialModule,

  ],
  exports:[
    ContactComponent
  ],
  providers:[
    ContactService
  ]
})


export class ContactModule{

}
