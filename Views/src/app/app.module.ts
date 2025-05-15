import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// below function get cnpj customer create partner create etc...
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorIntl as MatPaginatorIntl } from '@angular/material/paginator';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { FinancialModule } from 'src/components/financial/modules/financial.module';
import { TechnicianModule } from 'src/components/main/customer/technician/technician.module';
// import { ProfilesModule } from 'src/components/profile/modules/profiles.module';
import { CustomMatPaginatorIntl } from 'src/shared/custom-mat-paginator-intl';

import { SharedModule } from 'src/shared/modules/shared.module';
import { PartnerModule } from '../components/main/partner/modules/partner.module';

import { AppComponent } from './app.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { OutsourcedRoutingModule } from 'src/components/out-sourced/modules/out-sourced.routing';
import { StockProductRoutingModule } from 'src/components/stock-product/modules/stock-product.routing.module';
import { provideRouter, ROUTES, withPreloading } from '@angular/router';



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

   //MY IMPORTS Features
    // ProfilesModule,
    //Main
    PartnerModule,
    TechnicianModule,
    FinancialModule,


    //OUTSOURCED
    OutsourcedRoutingModule,
    //StockProduct
    StockProductRoutingModule,
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

      { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },


    //change appearance of all mat-form-field in all app
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


