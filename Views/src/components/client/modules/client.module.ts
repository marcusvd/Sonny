import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//Components
import { ClientListComponent } from 'src/components/client/client-list/component/client-list.component';
import { ClientRoutingModule } from "./client.routing.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { ClientCreateComponent } from "../client-create/component/client-create.component";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { TestComponent } from "../test/test.component";
import { ClientDetailsComponent } from "../client-details/component/client-details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClientDetailsTreeService } from "../client-details/services/client-details-tree.service";




@NgModule({
  declarations: [
    ClientListComponent,
    ClientEditComponent,
    ClientCreateComponent,
    ClientDetailsComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //MY IMPORTS
    SharedModule,
    ClientRoutingModule,
  ],
  exports: [],
  providers: [
    ClientDetailsTreeService
  ],
})

export class ClientModule {

}
