import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from "../components/side-nav/components/side-nav.component";
import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";

const routes: Routes = [
  {
    //
    path: 'side-nav', component: SideNavComponent, canActivate: [UserIsAuthenticatedGuard], children: [
      {
        path: 'customer-dash',
        loadChildren: () => import('../../components/main/customer/modules/customer.routing.module').then(x => x.CustomerRoutingModule)
      },
      {
        path: 'bench-budget-service-dash',
        loadChildren: () => import('../../components/bench-budget-service/modules/bench-budget-service.routing.module').then(x => x.BenchBudgetServiceRoutingModule)
      },
      // {
      //   path: 'services-provision-adm-dash',
      //   loadChildren: () => import('../../components/services-provision/modules/budget.routing.module').then(x => x.BudgetRoutingModule)
      // },
      {
        path: 'financial-dash',
        loadChildren: () => import('../../components/financial/modules/financial.routing.module').then(x => x.FinancialRoutingModule)
      },
      {
        path: 'partner-dash',
        loadChildren: () => import('../../components/main/partner/modules/partner.module.routing').then(x => x.PartnerRoutingModule)
      },
      {
        path: 'product-dash',
        loadChildren: () => import('../../components/product/modules/product.routing.module').then(x => x.ProductRoutingModule)
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






