import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/shared/modules/material.module";

import { TabGModule } from "../../tab-g/modules/tab-g.module";
import { ExpansionPanelGComponent } from "../component/expansion-panel-g.component";


@NgModule({
  declarations: [
    ExpansionPanelGComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   // BrowserAnimationsModule,
  ],
  exports: [
    ExpansionPanelGComponent,
  ]
})



export class ExpansionPanelGModule {}
