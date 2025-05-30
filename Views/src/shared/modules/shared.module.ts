import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";



// import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";
// import { MsgOperation } from "../services/messages/snack-bar.service";


import { IConfig, NgxMaskModule } from "ngx-mask";




// import { DialogQuizModule } from "../components/dialog-quiz/modules/dialog-quiz.module";
// import { FirstModule } from "../components/first/modules/first.module";

// import { SideNavModule } from "../components/modules.module";

// import { TitleModule } from "../components/title/module/title.module";

import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";
// import { BaseForm } from "../helpers/forms/base-form";
import { SharedRoutingModule } from "./shared.routing.module";
// import { MainEntitiesBaseComponent } from "src/components/main/inheritances/main-entities-base/main-entities-base.component";
// import { PhysicallyMovingCostsComponent } from "src/components/main/inheritances/physically-moving-costs/physically-moving-costs.component";
// import { DescriptionFieldComponent } from "../components/administrative/info/description-field.component";
// import { CheckButtonGModule } from "../components/check-button-g/modules/check-button-g.module";
// import { FinancialPixComponent } from "../components/financial/pix/financial-pix.component";
import { FormErrorPanelComponent } from "../components/form-error-panel/form-error-panel.component";



// import { TableGGridModule } from "../components/table-g-grid/modules/table-g-grid.module";
// import { PtBrCurrencyPipe } from "../pipes/pt-br-currency.pipe";

// import { ContactComponent } from "../components/contact/component/contact.component";





// const maskConfigFunction: () => Partial<IConfig> = () => {
//   return {
//     validation: true,
//   };
// };



@NgModule({
  declarations: [
    FormErrorPanelComponent
  ],

  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //MY IMPORTS

    SharedRoutingModule,
    // CurrencyMaskModule,
    // NgxMaskModule.forRoot(maskConfigFunction),

    // TableGGridModule,


    // TitleModule,
    // DialogQuizModule,
    // FirstModule,
    // SideNavModule,


    // CheckButtonGModule,



    //STANDALONE

  ],

  exports: [
    //components
    // DialogQuizComponent,
    // AddressComponent,
    //
    // ContactComponent,
    // ContactV2Component,

    FormErrorPanelComponent,
    // PhysicallyMovingCostsComponent,
    // MainEntitiesBaseComponent,
    // FinancialPixComponent,
    // DescriptionFieldComponent,

    //modules

    SharedRoutingModule,
    // CurrencyMaskModule,
    NgxMaskModule,

    // TableGGridModule,


    // TitleModule,
    // DialogQuizModule,
    // SideNavModule,


    // CheckButtonGModule,


    //Tests

    //Pipes
    // PtBrCurrencyPipe,
    // PtBrDataPipe,


  ],

  providers: [
    // MsgOperation,

    UserIsAuthenticatedGuard,
    // { provide: LOCALE_ID, useValue: 'pt-BR' },
    // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
