import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TableFullGComponent } from "../component/table-full-g.component";
import { MaterialModule } from "src/shared/modules/material.module";


@NgModule({
  declarations: [
    TableFullGComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableFullGComponent,
  ],
  providers: [

  ]

})

export class TableFullGModule {

}
