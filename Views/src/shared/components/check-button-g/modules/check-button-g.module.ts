import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CheckButtonGComponent } from "../component/check-button-g.component";
import { CheckOptionDisplayNameHandlePipe } from "../component/pipes/check-option-display-name-handle.pipe";
import { MaterialModule } from "src/shared/modules/material.module";




@NgModule({
  declarations: [
    CheckButtonGComponent,
    CheckOptionDisplayNameHandlePipe,

  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CheckButtonGComponent,
  ],
  providers: [

  ]

})

export class CheckButtonGModule {

}
