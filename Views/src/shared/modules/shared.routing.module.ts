import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from "../components/side-nav/components/side-nav.component";
import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";

const routes: Routes = [
  {
    //
    path: 'side-nav', component: SideNavComponent, canActivate: [UserIsAuthenticatedGuard], children: [
      {
        path: 'login',
        loadChildren: () => import('../../components/authentication/modules/auth-routing.module').then(x => x.AuthRoutingModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('../../components/main/customer/modules/customer.routing.module').then(x => x.CustomerRoutingModule),
      },
      // {
      //   path: 'bench-budget-service-dash',
      //   loadChildren: () => import('../../components/bench-budget-service/modules/bench-budget-service.routing.module').then(x => x.BenchBudgetServiceRoutingModule)
      // },
      // {
      //   path: 'services-provision-adm-dash',
      //   loadChildren: () => import('../../components/services-provision/modules/budget.routing.module').then(x => x.BudgetRoutingModule)
      // },
      {
        path: 'financial',
        loadChildren: () => import('../../components/financial/modules/financial.routing.module').then(x => x.FinancialRoutingModule)
      },
      {
        path: 'partner-dash',
        loadChildren: () => import('../../components/main/partner/modules/partner.module.routing').then(x => x.PartnerRoutingModule)
      },
      {
        path: 'outsourced-dash',
        loadChildren: () => import('../../components/out-sourced/modules/out-sourced.routing').then(x => x.OutsourcedRoutingModule)
      },
      {
        path: 'stock-product-router',
        loadChildren: () => import('../../components/stock-product/modules/stock-product.routing.module').then(x => x.StockProductRoutingModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../components/profile/modules/profiles-routing.module').then(x => x.ProfilesRoutingModule)
      }
      //,
      // {
      //   // path: 'address-2', component: AddressV2Component

      // }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})


export class SharedRoutingModule { }






