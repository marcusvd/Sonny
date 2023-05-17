import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "src/shared/modules/material.module";
import { SpinnerGComponent } from "../component/spinner-g.component";


@NgModule({
  declarations: [
    SpinnerGComponent,
      ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SpinnerGComponent,
      ],
  providers: [

  ]

})

export class SpinnerGModule {

}
