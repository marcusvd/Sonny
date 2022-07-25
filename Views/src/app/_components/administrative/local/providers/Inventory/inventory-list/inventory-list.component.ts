import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { InventoryListService } from '../services/inventory-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { PagedResult, Pagination } from 'src/app/_shared/dtos/pagination';
import { debounceTime } from 'rxjs/operators';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  dataSource: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject<HttpResponse<any>>(null);
  spinnerShowHide: boolean;
 // pagination: Pagination = new Pagination();
  pgIndex: number;
  totalItems: number;
  pgSize: number;
  // public terms: string;


  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public _InventoryListService: InventoryListService,
    private _ActRoute: ActivatedRoute,
    private _Router: Router
  ) { }


  // dataSourceNext(x?: HttpResponse<InventoryDto[]>) {
  //   if (x) {

  //    this.dataSource.next(x);

  //     return this.dataSource;
  //   }
  //   // else {
  //   //   this.dataSource.next(this._InventoryListService.inventories);

  //   //   return this.dataSource
  //   // }

  // }

  // pageSizeOptions: number[] = [10, 50, 100];
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  pageChange($event) {
    // this.paginator = $event;
    // this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
    //   .subscribe((i: PagedResult<InventoryDto[]>) => {
    //     this.data.data = i.result;
    //   })
  }


  spinner() {
    this.spinnerShowHide = !this.spinnerShowHide;
  }

  toLoad($event?: any) {
    let pagination: Pagination = new Pagination();

    pagination.currentPg = $event?.pageIndex + 1;
    pagination.pgSize = $event?.pageSize;


    //this._Router.navigate(['.', { pgIndex: this.pagination.currentPg, pgSize: this.pagination.pgSize }]);



    this._InventoryListService.loadAllPagedC$<InventoryDto[]>(pagination?.currentPg ?? 0, pagination?.pgSize ?? 10)
      .subscribe((x: HttpResponse<any>) => {
      pagination = JSON?.parse(x?.headers?.get('pagination'));

        const entities: any = x;
        this.dataSource.next(entities)




        this.pgIndex = pagination.currentPg;
    //    this.totalItems = pagination.totalItems;
        this.pgSize = pagination.pgSize;

      }).add(this.spinner()),
      () => {

      },
      () => {

        //   console.log(complete)
      }







    // this._ActRoute.data.subscribe((x: HttpResponse<InventoryDto[]>) => {

    //   this.dataSource.next(x)

    // })


    // setTimeout(() => {

    // }, 500);



    // this._InventoryListService.loadAllPagedC$<InventoryDto[]>($event?.pageIndex + 1, $event?.pageSize)
    //   .subscribe((i: HttpResponse<InventoryDto[]>) => {
    //     console.log('DELAY FORA ANTES')
    //     this.dataSource.next(i)


    //     setTimeout(x => {
    //       console.log('DELAY DENTRO')
    //     }, 5000);

    //     setTimeout
    //     console.log('DELAY FORA APOS')
    //     this.pgIndex = $event?.pageIndex;
    //     this.pgSize = $event?.pageSize;
    //     // this.totalItems = i.pagination.totalItems;
    //     // this.dataSource.next(i);

    //   }),
    //   () => {

    //   },
    //   () => {

    //     //   console.log(complete)
    //   }



  }

  // toSearch(pageIndex?: number, length?: number, pageSize?: number, term?: string, b?: boolean) {

  //   if (this._InventoryListService._delayInSearch.observers.length === 0) {

  //     this._InventoryListService._delayInSearch.pipe(debounceTime(1500)).subscribe(
  //       term => {

  //         this._InventoryListService.loadAllPagedC$(pageIndex + 1, pageSize, term)

  //           .subscribe((i: HttpResponse<InventoryDto[]>) => {

  //             this._InventoryListService._loading$.next(b)

  //             this.dataSource.next(i);

  //             // this.pgIndex = i.pagination.currentPg;
  //             // this.pgSize = i.pagination.pgSize;
  //             // this.totalItems = i.pagination.totalItems;

  //           }).add(this._InventoryListService._loading$.next(false))
  //       }
  //     )
  //   }
  //   this._InventoryListService._delayInSearch.next(term)
  // }

  ngOnInit(): void {
    this.toLoad();



    //  this._Router.navigate(['.', { pgIndex: this.pagination?.currentPg ?? 1, pgSize: this.pagination?.pgSize ?? 10}]);


    // this._InventoryListService.loadAllPagedC$<InventoryDto[]>(this.paginator?.pageIndex + 1, this.paginator?.pageSize)

    // this._ActRoute.data.subscribe((i: HttpResponse<InventoryDto[]>) => {
    //   // this.pagination = JSON.parse;




    //   // this.pgIndex = i.pagination.currentPg;
    //   // this.pgSize = i.pagination.pgSize;
    //   // this.totalItems = i.pagination.totalItems;
    //   this.dataSource.next(i);
    //   // this.dataSourceNext(i);


    // }),
    //   () => {

    //   },
    //   () => {

    //     //   console.log(complete)
    //   }




  }
  // ngAfterViewChecked(): void {
  //   this.pgIndex = this.pagination.currentPg;
  //   this.totalItems = this.pagination.totalItems;
  //   this.pgSize = this.pagination.pgSize;
  // }

}
