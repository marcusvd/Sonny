import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";
import { MatGridListModule} from "@angular/material/grid-list";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";


@NgModule({
  declarations:
    [
      CollectDeliverCreateComponent
    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    RouterModule,
    //My

    SharedModule,

  ],
  exports: [

  ],
  providers: [


  ]

})

export class CollectDeliverCreateModule {

}
