import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';


import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { InventoryModule } from 'src/components/providers/Inventory/modules/inventory.module';
import { FinancialModule } from 'src/components/financial/modules/financial.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { PartnerModule } from '../components/partner/modules/partner.module';
import { EletronicRepairModule } from '../components/out-sourced/eletronic-repair/modules/eletronic-repair.module';
import { WebcamModule } from 'ngx-webcam';
import { BudgetBenchServicesModule } from 'src/components/services-provision/modules/budget-bench.services.module';
import { CustomerModule } from 'src/components/customer/modules/customer.module';
import { TechnicianModule } from 'src/components/customer/technician/technician.module';
import { CollectDeliverCreateModule } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/modules/collect-deliver-create.module';
import { AuthModule } from 'src/components/authentication/modules/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    //MY IMPORTS Shared
    MatGridListModule,//just works fine here
    SharedModule,
    MaterialModule,
    //MY IMPORTS Features,
    //AUTHENTICATION
    AuthModule,
    InventoryModule,
    CollectDeliverCreateModule,
    PartnerModule,
    CustomerModule,
    TechnicianModule,
    FinancialModule,
    EletronicRepairModule,
    BudgetBenchServicesModule,
    //SideNavModule,
    //FirstModule,
    //OUTSOURCED
    WebcamModule,
  ],

  exports: [

  ],

  providers: [
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


