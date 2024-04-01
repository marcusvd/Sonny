import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// below function get cnpj customer create partner create etc...
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
//
import { HttpErrorHandler } from './http-error-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { FinancialModule } from 'src/components/financial/modules/financial.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { PartnerModule } from '../components/main/partner/modules/partner.module';
import { EletronicRepairModule } from '../components/out-sourced/eletronic-repair/modules/eletronic-repair.module';
import { WebcamModule } from 'ngx-webcam';
import { CustomerModule } from 'src/components/main/customer/modules/customer.module';
import { TechnicianModule } from 'src/components/main/customer/technician/technician.module';
import { CollectDeliverCreateModule } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/modules/collect-deliver-create.module';
import { AuthModule } from 'src/components/authentication/modules/auth.module';
import { ProfilesModule } from 'src/components/profile/modules/profiles.module';
import { ProductModule } from 'src/components/product/modules/product.module';
import { BenchBudgetServiceModule } from 'src/components/bench-budget-service/modules/bench-budget-service.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/shared/custom-mat-paginator-intl';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    //just works fine here
    MatGridListModule,
    //MY IMPORTS
    SharedModule,
    MaterialModule,
   //MY IMPORTS Features
    AuthModule,
    ProfilesModule,
    CollectDeliverCreateModule,
    //Main
    PartnerModule,
    ProductModule,
    CustomerModule,
    TechnicianModule,
    FinancialModule,
    EletronicRepairModule,
    BenchBudgetServiceModule,
    //OUTSOURCED
    WebcamModule,
    //test
    // TestsComponent,
    // GridListCommonTableComponent
    // below function get cnpj customer create partner create etc...
    HttpClientJsonpModule,
    HttpClientModule,
    //
  ],

  exports: [

  ],

  providers: [
    HttpErrorHandler,

      { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }

    //change appearance of all mat-form-field in all app
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


