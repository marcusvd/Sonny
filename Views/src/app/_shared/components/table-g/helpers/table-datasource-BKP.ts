import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
// import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { InventoryDto } from "../dtos/inventory-dto";
import { InventoryToView } from "../dtos/inventory-to-view";
import { PaginatorDto } from "../dtos/paginator-dto";
// import { AlternativeService } from "../services/alternative.service";
// import { TableGenericListService } from "../services/table-g-list.service";



// export class TableDataSourceBkp implements DataSource<any>{


//   public data = new BehaviorSubject<any>([]);
//   lodingSubject = new BehaviorSubject<boolean>(false);
//   loading$ = this.data.asObservable();
//   pagination = new PaginatorDto();

//   constructor(
//     private collectionDeliveryService?: TableGenericListService,
//     private AService?: AlternativeService,

//   ) {

//   }

//   connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
//     return this.data.asObservable();
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.data.complete();
//     this.lodingSubject.complete();
//   }

//   startDate = new Date(2022, 2, 1);
//   endDate = new Date(2022, 2, 30);


//   collectDeliveryLoad(pageIndex = 0, pageSize = 10, filter = '', sortDirection = 'asc') {

//     this.collectionDeliveryService.pagAllIncluded(pageIndex, pageSize, filter, this.startDate, this.endDate)
//       .pipe(
//         catchError(() => of([])),
//         finalize(() => this.lodingSubject.next(false))
//       ).subscribe((httpResponse: HttpResponse<any[]>) => {
//         const HttpdataReturn = httpResponse;
//         const pagination = JSON.parse(HttpdataReturn.headers.get('pagination'));

//         // console.log('AQUI', pagination);
//         // console.log('ENTITIES', HttpdataReturn.body);

//         // this.dataSource(i.body);
//         //  this.paginator.pageSize = pagination.pgSize;
//         //  this.paginator.length = pagination.totalItems;
//         //  console.log(HttpdataReturn.headers)
//         this.data.next(HttpdataReturn.body);

//       })




//   }
//   inventoryLoad$(pageIndex = 0, pageSize = 10, filter = '', sortDirection = 'asc') {

//    return this.AService.pagAllIncluded(pageIndex, pageSize, filter, this.startDate, this.endDate)
//       .pipe(
//         catchError(() => of([])),
//         finalize(() => this.lodingSubject.next(false))
//       )
//   }
//   inventoryLoad(pageIndex = 0, pageSize = 10, filter = '') {
//     const bodyReturnToView = [];
//     this.AService.pagAllIncluded(pageIndex, pageSize, filter, this.startDate, this.endDate)
//       .pipe(
//         catchError(() => of([])),
//         finalize(() => this.lodingSubject.next(false))
//       ).subscribe((httpResponse: HttpResponse<any[]>) => {
//         const HttpdataReturn = httpResponse;
//         HttpdataReturn.body.forEach((element: InventoryDto) => {
//          const InvToView = new InventoryToView();
//          InvToView.id = element.id;
//          InvToView.equipament = element?.equipament.name;
//          InvToView.quantity = element.quantity;
//          InvToView.model = element.model;
//          InvToView.saleprice = element.saleprice;
//          InvToView.manufactorer = element.manufactorer;
//          bodyReturnToView.push(InvToView)

//         })
//         // console.log(HttpdataReturn.headers.get('pagination')['length'])

//         localStorage.setItem('pagination', HttpdataReturn.headers.get('pagination'));
//         // console.log(bodyReturnToView)
//         this.data.next(bodyReturnToView);
//       })




//   }





// }
