import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/shared/modules/material.module";
import { DialogQuizComponent } from "../dialog-quiz.component";

@NgModule({
  declarations: [
    DialogQuizComponent
  ],
  imports: [
    CommonModule,

    
  ],
  exports: [
    DialogQuizComponent
  ]
})

export class DialogQuizModule {

}
