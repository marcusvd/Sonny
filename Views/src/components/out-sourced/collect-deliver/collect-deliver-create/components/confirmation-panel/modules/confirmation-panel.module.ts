import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/shared/modules/material.module";
import { ConfirmationPanelComponent } from "../confirmation-panel.component";
import { DisplayNameHandlePipe } from "../pipes/display-name-handle.pipe";
import { DisplayNameHighlightDirective } from "../directives/display-name-highlight.directive";

@NgModule({
  declarations: [
    ConfirmationPanelComponent,
    DisplayNameHandlePipe,
    DisplayNameHighlightDirective
  ],
  imports: [
    CommonModule,

    MaterialModule,
  ],
  exports: [
    ConfirmationPanelComponent
  ]
})

export class ConfirmationPanelModule {

}
