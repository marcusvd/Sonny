import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/shared/modules/material.module";
import { GridGComponent } from "../component/grid-g.component";


@NgModule({
  declarations: [
    GridGComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GridGComponent
  ],
  providers: [
  ]

})

export class GridGModule {

}
