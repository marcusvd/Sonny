import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
