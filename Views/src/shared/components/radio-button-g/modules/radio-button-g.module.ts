import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/shared/modules/material.module";
import { RadioButtonGComponent } from "../component/radio-button-g.component";
import { RadioOptionDisplayNameHandlePipe } from "../component/pipes/radio-option-display-name-handle.pipe";



@NgModule({
  declarations: [
    RadioButtonGComponent,
    RadioOptionDisplayNameHandlePipe,

  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RadioButtonGComponent,
  ],
  providers: [

  ]

})

export class RadioButtonGModule {

}
