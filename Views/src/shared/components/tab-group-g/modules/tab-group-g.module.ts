import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/shared/modules/material.module";
import { TabGroupGComponent } from "../component/tab-group-g.component";



@NgModule({
  declarations: [
    TabGroupGComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    TabGroupGComponent
  ],
  providers:[

  ]
})

export class TabGroupGModule {

}
