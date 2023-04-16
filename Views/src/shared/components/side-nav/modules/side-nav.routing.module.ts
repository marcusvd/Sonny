import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';
import { SideNavComponent } from '../components/side-nav.component';


const routes: Routes = [
  // {
  //   path: 'side-nav', component: SideNavComponent,canActivate:[UserIsAuthenticatedGuard], children: [
  //     {
  //       path: 'customer-dash',
  //       loadChildren: () => import('../../../../components/customer/modules/customer.module').then(x => x.CustomerModule)
  //     },
  //     {
  //       path: 'services-provision-tech-dash',
  //       loadChildren: () => import('../../../../components/services-provision/modules/bench.routing.module').then(x => x.BenchRoutingModule)
  //     },
  //     {
  //       path: 'services-provision-adm-dash',
  //       loadChildren: () => import('../../../../components/services-provision/modules/budget.routing.module').then(x => x.BudgetRoutingModule)
  //     },
  //     {
  //       path: 'financial-dash',
  //       loadChildren: () => import('../../../../components/financial/modules/financial.routing.module').then(x => x.FinancialRoutingModule)
  //     },
  //     {
  //       path: 'partner-dash',
  //       loadChildren: () => import('../../../../components/partner/modules/partner.module.routing').then(x => x.PartnerRoutingModule)
  //     },
  //     {
  //       path: 'inventory-dash',
  //       loadChildren: () => import('../../../../components/providers/Inventory/modules/inventory.routing.module').then(x => x.InventoryRoutingModule)
  //     }
  //   ]
  // }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class SideNavRoutingModule { }
