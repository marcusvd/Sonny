import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';
//import { SideNavComponent } from 'src/shared/components/side-nav/side-nav.component';

import { MaterialModule } from "./material.module";

import { MsgOperation } from "../services/messages/snack-bar.service";
import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";

import { IConfig, NgxMaskModule } from "ngx-mask";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PaginatedTableGComponent } from "../components/table-g/component/paginated-table-g.component";
import { SearchTableGComponent } from "../components/table-g/component/search-table-g.component";
import { AddressComponent } from "../components/address/component/address.component";
import { ContactComponent } from "../components/contact/component/contact.component";
import { ContactService } from "../components/contact/services/contact.service";
import { AddressService } from "../components/address/services/address.service";


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BaseForm } from "../helpers/forms/base-form";
import { ExpansionPanelGModule } from "../components/expansion-panel-g/module/expansion-panel-g.module";
import { TabGModule } from "../components/tab-g/modules/tab-g.module";
import { ContactDetailsComponent } from "../components/contact-details/component/contact-details.component";
import { TreeGModule } from "../components/tree-g/modules/tree-g.module";
import { CardGModule } from "../components/card-g/module/card-g.module";
import { TitleModule } from "../components/title/module/title.module";
import { DialogQuizModule } from "../components/dialog-quiz/modules/dialog-quiz.module";
import { InsideNavComponent } from "../components/inside-nav/inside-nav.component";
import { PaginatorModule } from "../components/paginator/modules/paginator.module";
import { FirstComponent } from "../components/first/components/first.component";
import { SharedRoutingModule } from "./shared.routing.module";
// import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";
import { SideNavComponent } from "../components/side-nav/components/side-nav.component";
import { SideNavModule } from "../components/side-nav/modules/side-nav.module";
import { FirstModule } from "../components/first/modules/first.module";
import { AddressV2Component } from "../components/address/component/v2/address-v2.component";



registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR');


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "center",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};



@NgModule({
  declarations: [
    BaseForm,
    NavbarComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    AddressV2Component,
    ContactComponent,
    ContactDetailsComponent,
    InsideNavComponent,
    // FirstComponent,
    // SideNavComponent
  ],

  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //MY IMPORTS
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    ExpansionPanelGModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    TabGModule,
    PaginatorModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    FirstModule,
    SideNavModule



  ],

  exports: [
    NavbarComponent,
    DialogQuizComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    AddressV2Component,
    ContactComponent,
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    ExpansionPanelGModule,
    NgxMaskModule,
    TabGModule,
    PaginatorModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    InsideNavComponent,
    FirstModule,
    SideNavModule
    // FirstComponent,
    // SideNavComponent
  ],

  providers: [

    MsgOperation,
    AddressService,
    ContactService,
    // UserIsAuthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
