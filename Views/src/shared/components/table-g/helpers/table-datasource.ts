
import { MatTableDataSource } from "@angular/material/table";

import { InventoryListService } from "src/components/providers/Inventory/services/inventory-list.service";
import { take } from "rxjs/operators";

import { ClientListService } from "src/components/client/services/client-list.service";
import { CollectDeliverAllListTableService } from "src/components/out-sourced/collect-deliver-list-table-all/services/collect-deliver-all-list-table.service";

export class TableDataSource extends MatTableDataSource<any>{
  constructor(
    private _InventoryListService?: InventoryListService,
    private _CollectDeliverAllListTableService?: CollectDeliverAllListTableService,
    private _ClientListServices?: ClientListService,

  ) {
    super();
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

}
