import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";
import { MsgOperation } from "../services/messages/snack-bar.service";

import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from "ngx-mask";
import { AddressComponent } from "../components/address/component/address.component";
import { AddressService } from "../components/address/services/address.service";
import { ContactComponent } from "../components/contact/component/v1/contact.component";
import { ContactService } from "../components/contact/services/contact.service";


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { AddressV2Component } from "../components/address/component/v2/address-v2.component";
import { CardGModule } from "../components/card-g/module/card-g.module";
import { ContactDetailsComponent } from "../components/contact-details/component/contact-details.component";
import { ContactV2Component } from "../components/contact/component/v2/contact-v2.component";
import { ContactV2Service } from "../components/contact/services/contact-v2.service";
import { DialogQuizModule } from "../components/dialog-quiz/modules/dialog-quiz.module";
import { FirstModule } from "../components/first/modules/first.module";
import { InsideNavComponent } from "../components/inside-nav/inside-nav.component";
import { SideNavModule } from "../components/side-nav/modules/side-nav.module";
import { TabGModule } from "../components/tab-g/modules/tab-g.module";
import { TitleModule } from "../components/title/module/title.module";
import { TreeGModule } from "../components/tree-g/modules/tree-g.module";
import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";
import { BaseForm } from "../helpers/forms/base-form";
import { SharedRoutingModule } from "./shared.routing.module";
// import { TestsComponent } from "src/tests/tests.component";
import { MainEntitiesBaseComponent } from "src/components/main/inheritances/main-entities-base/main-entities-base.component";
import { PhysicallyMovingCostsComponent } from "src/components/main/inheritances/physically-moving-costs/physically-moving-costs.component";
import { DescriptionFieldComponent } from "../components/administrative/info/description-field.component";
import { NameCpfCnpjComponent } from "../components/administrative/name-cpf-cnpj/name-cpf-cnpj.component";
import { CheckButtonGModule } from "../components/check-button-g/modules/check-button-g.module";
import { FinancialPixComponent } from "../components/financial/pix/financial-pix.component";
import { FormErrorPanelComponent } from "../components/form-error-panel/form-error-panel.component";
import { GridGModule } from "../components/grid-g/modules/grid-g.module";
import { GridListModule } from "../components/grid-list-opts/modules/grid-list.module.module";
import { RadioButtonGModule } from "../components/radio-button-g/modules/radio-button-g.module";
import { SpinnerGModule } from "../components/spinner-g/modules/spinner-g.module";
import { TableGGridModule } from "../components/table-g-grid/modules/table-g-grid.module";
import { PtBrCurrencyPipe } from "../pipes/pt-br-currency.pipe";
import { PtBrDataPipe } from "../pipes/pt-br-date.pipe";


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
    AddressComponent,
    AddressV2Component,
    ContactComponent,
    ContactV2Component,
    ContactDetailsComponent,
    InsideNavComponent,
    FormErrorPanelComponent,
    PhysicallyMovingCostsComponent,
    MainEntitiesBaseComponent,
    FinancialPixComponent,
    NameCpfCnpjComponent,
    DescriptionFieldComponent,

    //Pipes
    PtBrCurrencyPipe,
    PtBrDataPipe,
    //Tests
    // TestsComponent,


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
    NgxMaskModule.forRoot(maskConfigFunction),
    TabGModule,
    TableGGridModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    FirstModule,
    SideNavModule,
    SpinnerGModule,
    RadioButtonGModule,
    CheckButtonGModule,
    GridGModule,
    GridListModule,
    // SearchGModule
  ],

  exports: [
    //components
    DialogQuizComponent,
    AddressComponent,
    AddressV2Component,
    ContactComponent,
    ContactV2Component,
    InsideNavComponent,
    FormErrorPanelComponent,
    PhysicallyMovingCostsComponent,
    MainEntitiesBaseComponent,
    FinancialPixComponent,
    DescriptionFieldComponent,

    //modules
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    NgxMaskModule,
    TabGModule,
    TableGGridModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    SideNavModule,
    SpinnerGModule,
    RadioButtonGModule,
    CheckButtonGModule,
    GridGModule,
    GridListModule,
    //Tests
    // TestsComponent,
    //Pipes
    PtBrCurrencyPipe,
    PtBrDataPipe,


  ],

  providers: [
    MsgOperation,
    AddressService,
    ContactService,
    ContactV2Service,
    UserIsAuthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
