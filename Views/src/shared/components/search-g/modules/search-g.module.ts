import { NgModule } from "@angular/core";
import { SearchGComponent } from "../search-g.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/shared/modules/material.module";


@NgModule({
  declarations: [SearchGComponent],
  imports: [
    CommonModule,
    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SearchGComponent]
})

export class SearchGModule { }
