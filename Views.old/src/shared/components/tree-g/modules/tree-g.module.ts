import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/shared/modules/material.module";
import { TreeGComponent } from "../components/tree-g.component";

@NgModule({
  declarations: [
    TreeGComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    // MatButtonModule
  ],
  exports: [
    TreeGComponent,
  ],
  providers:[

  ]
})

export class TreeGModule {


}
