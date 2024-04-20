import { HttpClient, HttpParams } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PaginationDto } from "src/shared/dtos/pagination-dto";
import { FilterTerms } from "src/shared/helpers/query/filter-terms";
import { OrderBy } from "src/shared/helpers/query/order-by";
import { BackEndService } from "src/shared/services/back-end/backend.service";

export class GridListCommonHelper extends BackEndService<any> {

  entitiesFromDb = new BehaviorSubject<any[]>([]);
  lengthPaginator = new BehaviorSubject<number>(0);
  entities$ = this.entitiesFromDb.asObservable();


  constructor(
    override _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    super(_http, environment.backEndDoor)

  }

  paramsTo(pageIndex: number, pgSize: number, predicate?: number, $event?: FormControl, terms?: FilterTerms, orderBy?:OrderBy) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pgSize);
    params = params.append('predicate', predicate ?? JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', $event?.value ?? '');
    params = params.append('filterterms', JSON.stringify(terms) ?? '');
    params = params.append('orderby', JSON.stringify(orderBy) ?? '');
    return params;
  }

  pagination: PaginationDto = new PaginationDto();
  getAllEntitiesPaged(backEndUrl: string, params: HttpParams) {
    this.loadAllPaged$<any[]>(backEndUrl, params)
      .subscribe((entities: any) => {
        this.pagination = JSON.parse(entities.headers.get('Pagination'));
        this.lengthPaginator.next(this.pagination.totalCount);
        this.entitiesFromDb.next(entities.body);
      })
  }


  paginationInMemory: PaginationDto = new PaginationDto();
  getAllEntitiesInMemoryPaged(backEndUrl: string, id:string) {
    this.loadById$<any[]>(backEndUrl, id)
      .subscribe((entities: any) => {
        // this.paginationInMemory.totalCount = entities.length;
        console.log(entities.length)
        this.lengthPaginator.next(entities.length);
        this.entitiesFromDb.next(entities);
      })
  }


  searchQueryHendler(backEndUrl?: string, params?: HttpParams) {
    this.loadAllPaged$<any[]>(backEndUrl, params).subscribe(
      (x: any) => {
        this.pagination = JSON.parse(x.headers.get('Pagination'));
        this.entitiesFromDb.next(x.body);
        this.lengthPaginator.next(this.pagination.totalCount);
      }
    )
  }


  // searchQueryHendler($event: FormControl, backEndUrl: string, params: HttpParams) {
  //   this.queryField = $event;
  //   this.queryField.valueChanges.pipe(
  //     map(x => x.trim()),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap(() => this.loadAllPaged$<any[]>(backEndUrl, params)),
  //   ).subscribe(
  //     (x:any) => {

  //       this.entitiesFromDb.next(x.body);
  //       this.lengthPaginator.next(x.body.lengthPaginator);
  //     }
  //   );
  // }

}

