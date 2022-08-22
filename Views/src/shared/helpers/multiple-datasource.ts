
import { MatTableDataSource } from "@angular/material/table";

import { InventoryListService } from "src/components/providers/Inventory/services/inventory-list.service";
import { take } from "rxjs/operators";

import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { CollectDeliverAllListTableService } from "src/components/out-sourced/collect-deliver-list-table-all/services/collect-deliver-all-list-table.service";
import { ServiceBenchListService } from "src/components/services-provision/service-bench/bench/services/service-bench-list.service";
import { ServicesBudgetListService } from "src/components/services-provision/service-budget/services/services-budget-list.service";

export class MultipleDataSource {
  constructor(
    private _InventoryListService?: InventoryListService,
    private _CollectDeliverAllListTableService?: CollectDeliverAllListTableService,
    private _ClientListServices?: ClientListService,
    private _ServicebudgetServices?: ServicesBudgetListService,
    private _ServiceBenchListServices?: ServiceBenchListService,
  ) {
  }


  inventoryLoad$(pageIndex = 0, pageSize = 10, filter = '', sortDirection = 'asc') {

    return this._InventoryListService.loadAllPagedIncluded$(pageIndex, pageSize)
    .pipe(
         take(1)
       )
   }

  collectionDelivery$(pageIndex = 0, pageSize = 10, filter = '', star?:Date, end?:Date) {

    return this._CollectDeliverAllListTableService.loadAllPagedIncluded$(pageIndex, pageSize, filter, star,end)
    .pipe(
         take(1)
       )
   }
  clientsLoad$(pageIndex = 0, pageSize = 10, filter = '', star?:Date, end?:Date) {

    return this._ClientListServices.loadAllPagedIncluded$(pageIndex, pageSize, filter, star,end)
    .pipe(
         take(1)
       )
   }
  serviceBenchLoad$() {

    return this._ServiceBenchListServices.loadAllIncluded$()
    .pipe(
         take(1)
       )
   }
   servicebudgetServices$() {

    return this._ServicebudgetServices.loadAllIncluded$()
    .pipe(
         take(1)
       )
   }

}
