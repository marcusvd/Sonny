import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { TabGComponent } from "../component/tab-g.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/shared/modules/material.module";

@NgModule({
  declarations: [
    TabGComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  exports: [
    TabGComponent
  ],
  providers:[

  ]
})

export class TabGModule {

}
