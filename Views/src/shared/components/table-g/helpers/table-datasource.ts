
import { MatTableDataSource } from "@angular/material/table";

import { InventoryListService } from "src/components/providers/Inventory/services/inventory-list.service";
import { take } from "rxjs/operators";
import { CustomerListService } from "src/components/customer/components/services/customer-list.service";


// import { ServiceBenchListService } from "src/components/services-provision/bench/services/service-bench-list.service_NOTUSED";


export class TableDataSource extends MatTableDataSource<any>{
  constructor(
    private _InventoryListService?: InventoryListService,
    private _customerListServices?: CustomerListService,
    // private _ServiceBenchListServices?: ServiceBenchListService,

  ) {
    super();
  }


  inventoryLoad$(pageIndex = 0, pageSize = 10, filter = '', sortDirection = 'asc') {

    return this._InventoryListService.loadAllPagedIncluded$(pageIndex, pageSize)
    .pipe(
         take(1)
       )
   }

  // collectionDelivery$(pageIndex = 0, pageSize = 10, filter = '', star?:Date, end?:Date) {

  //   return this._CollectDeliverAllListTableService.loadAllPagedIncluded$(pageIndex, pageSize, filter, star,end)
  //   .pipe(
  //        take(1)
  //      )
  //  }
  clientsLoad$(pageIndex = 0, pageSize = 10, filter = '', star?:Date, end?:Date) {

    return this._customerListServices.loadAllPagedIncluded$(pageIndex, pageSize, filter, star,end)
    .pipe(
         take(1)
       )
   }
  // serviceBenchLoad$() {

  //   return this._ServiceBenchListServices.loadAllIncluded$()
  //   .pipe(
  //        take(1)
  //      )
  //  }

}
