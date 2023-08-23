import { Injectable, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { SearchType } from "./search-type";
import { Observable, Subscription, of } from "rxjs";
import { map } from "rxjs/operators";
import { CustomerDto } from "src/components/main/customer/dto/customer-dto";

@Injectable({
  providedIn: 'root'
})

export class SearchTestFilterFrontService {

  constructor() {

  }



  //searchResultReturn: Observable<SearchType[]> = new Observable<SearchType[]>();

  // public makeEntitySearch(obj: any, params: any) {
  //   obj.map((x: any) => {
  //     let objSelected = new SearchType();
  //     objSelected.id = x[params.param0];
  //     objSelected.name = x[params.param1]
  //     objSelected.type = params.type;
  //     this.searchResult.push(objSelected);
  //   })
  //   this.searchResultReturn = of(this.searchResult);
  //   return of(this.searchResultReturn);
  // }

  // toDestroy: Subscription;
  // public searchFilter(param: string) {
  //   this.searchResult = [];
  //   this.toDestroy = this.searchResultReturn.pipe(map(x => x.filter(xy => {
  //     if (xy.type === param) {
  //       this.searchResult.push(xy)
  //     }
  //     if (param === 'everyone') {
  //       this.searchResult.push(xy)
  //     }
  //   }))).subscribe();
  // }

  customerToFilter: CustomerDto[] = [];

  resultFilterCustomer: CustomerDto[] = [];
  // get filteredCustomerResults() {
  //   console.log(this.customerToFilter)
  //   return this.resultFilterCustomer
  // }
  public filteringCustomers(params: string) {
    console.log(this.customerToFilter)
    this.resultFilterCustomer = [];
    this.resultFilterCustomer = this.customerToFilter.filter((x: CustomerDto) => x.name.toLowerCase().includes(params))

    // this.toDestroy = this.searchResultReturn.pipe(map(x => x.filter(xy => {
    //   if (xy.name.toLowerCase().includes(param.toLowerCase())) {
    //     this.searchResult.push(xy)
    //   }
    // }))).subscribe();
  }


}


