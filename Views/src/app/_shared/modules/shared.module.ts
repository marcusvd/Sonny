import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


import { AddressComponent } from 'src/app/_shared/components/address/address.component';
import { ContactComponent } from 'src/app/_shared/components/contact/contact.component';
import { WebcamModule } from 'ngx-webcam';
import { NavbarComponent } from 'src/app/_shared/components/navbar/navbar.component';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { SideNavComponent } from 'src/app/_shared/components/side-nav/side-nav.component';
import { NavBackDirective } from 'src/app/_shared/directives/nav-back.directive';
import { BackButtonComponent } from 'src/app/_shared/components/back-button/back-button.component';
import { MaterialModule } from "./material.module";
import { SharedRoutingModule } from "../routes/shared.routing.module";
import { ContactValidatorsService } from "../components/contact/services/contact-validators.service";
import { DeleteModalComponent } from "../components/delete-modal/delete-modal.component";
import { AddressValidatorsService } from "../components/address/services/address-validators.service";
import { DeleteCrudService } from "../components/delete-modal/services/delete_crud.service";
import { TypePaymentCreateComponent } from 'src/app/_components/administrative/local/financial/components/type-payment/type-payment-create/type-payment-create.component';
import { CheckingAccountComponent } from "src/app/_components/administrative/local/financial/components/checking-account/cheking-account.component";
import { MsgOperation } from "../services/messages/snack-bar.service";
import { ConfirmModalComponent } from "src/app/_shared/components/confirm-modal/confirm-modal.component";



@NgModule({
  declarations: [
    NavbarComponent,
     SideNavComponent,
     NavBackDirective,

     ContactComponent,
     BackButtonComponent,
     DeleteModalComponent,
     ConfirmModalComponent,
     AddressComponent,
     TypePaymentCreateComponent,
     CheckingAccountComponent

  ],
  imports: [
    CommonModule,
    WebcamModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    SharedRoutingModule
  ],
  exports: [
    WebcamModule,
    RouterModule,
    NavbarComponent,
     SideNavComponent,
     NavBackDirective,
     ContactComponent,
     AddressComponent,
     BackButtonComponent,
     SharedRoutingModule,
     DeleteModalComponent,
     ConfirmModalComponent,
     TypePaymentCreateComponent,
     CheckingAccountComponent,
     MaterialModule,


  ],
  providers: [
    ValidatorsService,
    ContactValidatorsService,
    AddressValidatorsService,
    DeleteCrudService,
    MsgOperation
  ]

})

export class SharedModule {

}
