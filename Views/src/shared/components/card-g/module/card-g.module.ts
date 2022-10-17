import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/shared/modules/material.module";
import { CardGContainerComponent } from "../card-g-container.component";
import { CardGComponent } from "../card-g.component";

@NgModule({
    declarations: [
      CardGComponent,
      CardGContainerComponent
    ],
    imports:[
      CommonModule,
      MaterialModule,
    ],
    exports:[
      CardGComponent,
      CardGContainerComponent
    ],
  })

export class CardGModule {

}
