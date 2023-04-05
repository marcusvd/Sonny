import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from "../components/first/components/first.component";
import { SideNavComponent } from "../components/side-nav/components/side-nav.component";
import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";

const routes: Routes = [
  {
    path: 'side-nav', component: SideNavComponent, canActivate: [UserIsAuthenticatedGuard], children: [
      {
        path: 'first',
        loadChildren: () => import('../../shared/components/first/modules/first.routing.module').then(x => x.FirstRoutingModule)
      },
      {
        path: 'customer-dash',
        loadChildren: () => import('../../components/customer/modules/customer.module').then(x => x.CustomerModule)
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
        path: 'inventory-dash',
        loadChildren: () => import('../../components/providers/Inventory/modules/inventory.routing.module').then(x => x.InventoryRoutingModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../components/profile/modules/profiles-routing.module').then(x => x.ProfilesRoutingModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})


export class SharedRoutingModule { }






