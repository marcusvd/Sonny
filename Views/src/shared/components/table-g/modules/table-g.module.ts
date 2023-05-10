import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableGComponent } from "../component/table-g.component";
import { MaterialModule } from "src/shared/modules/material.module";


@NgModule({
  declarations: [
    TableGComponent,
      ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableGComponent,
      ],
  providers: [

  ]

})

export class TableGModule {

}
