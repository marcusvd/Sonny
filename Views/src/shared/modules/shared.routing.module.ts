import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from "../components/side-nav/components/side-nav.component";
 import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";
import { AddressV2Component } from "../components/address/component/v2/address-v2.component";

const routes: Routes = [
  {
    //
    path: 'side-nav', component: SideNavComponent, canActivate:[UserIsAuthenticatedGuard], children: [
      {
        path: 'customer-dash',
        loadChildren: () => import('../../components/customer/modules/customer.routing.module').then(x => x.CustomerRoutingModule)
      },
      {
        path: 'services-provision-tech-dash',
        loadChildren: () => import('../../components/services-provision/modules/bench.routing.module').then(x => x.BenchRoutingModule)
      },
      {
        path: 'services-provision-adm-dash',
        loadChildren: () => import('../../components/services-provision/modules/budget.routing.module').then(x => x.BudgetRoutingModule)
      },
      {
        path: 'financial-dash',
        loadChildren: () => import('../../components/financial/modules/financial.routing.module').then(x => x.FinancialRoutingModule)
      },
      {
        path: 'partner-dash',
        loadChildren: () => import('../../components/partner/modules/partner.module.routing').then(x => x.PartnerRoutingModule)
      },
      {
        path: 'stock-dash',
        loadChildren: () => import('../../components/providers/stock/modules/stock.routing.module').then(x => x.StockRoutingModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../components/profile/modules/profiles-routing.module').then(x => x.ProfilesRoutingModule)
      },
      {
        path: 'address-2', component: AddressV2Component

      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})


export class SharedRoutingModule { }






