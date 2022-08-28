import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/shared/modules/material.module";
import { TabGroupGModule } from "../../tab-group-g/modules/tab-group-g.module";
import { ExpansionPanelComponent } from "../component/expansion-panel.component";



@NgModule({
  declarations: [
    ExpansionPanelComponent
  ],
  imports: [
    MaterialModule,
    TabGroupGModule,
    CommonModule
  ],
  exports: [
    ExpansionPanelComponent,
  ]
})



export class ExpansionPanelModule {}
