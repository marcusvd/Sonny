import { HttpClient, HttpParams } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PaginationDto } from "src/shared/dtos/pagination-dto";
import { SearchTerms } from "src/shared/helpers/search/SearchTerms";
import { BackEndService } from "src/shared/services/back-end/backend.service";

export class GridListCommonHelper extends BackEndService<any> {

  entitiesBehaviorSubject = new BehaviorSubject<any[]>([]);
  searchItensFound = new BehaviorSubject<number>(0);

  entities$ = this.entitiesBehaviorSubject.asObservable();

  pageSize: number = 5;

  constructor(
    override _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    super(_http, environment.backEndDoor)

  }

  paramsTo(pageIndex: number, pgSize: number, predicate?: number, $event?: FormControl, terms?: SearchTerms) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pgSize);
    params = params.append('predicate', predicate ?? JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', $event?.value ?? '');
    params = params.append('searchterms', JSON.stringify(terms) ?? '');
    return params;
  }


  entitiesBehaviorSubjectNext(entities: any[]) {
    this.entitiesBehaviorSubject.next(entities);
  }

  length: number = 0;
  getLengthEntitiesFromBackEnd(lengthEntityName: string) {
    this._route.data.subscribe({
      next: (item: any) => {
        // this.length = item.loaded[lengthEntityName];
      }
    });
  }

  pagination: PaginationDto = new PaginationDto();
  getAllEntitiesPaged(backEndUrl: string, params: HttpParams) {
    this.loadAllPaged$<any[]>(backEndUrl, params)
      .subscribe((entities: any) => {
        this.pagination = JSON.parse(entities.headers.get('Pagination'));
        this.searchItensFound.next(this.pagination.totalCount);
        this.entitiesBehaviorSubject.next(entities.body);
      })
  }

  searchQueryHendler(backEndUrl?: string, params?: HttpParams) {
    this.loadAllPaged$<any[]>(backEndUrl, params).subscribe(
      (x: any) => {
        this.pagination = JSON.parse(x.headers.get('Pagination'));
        this.entitiesBehaviorSubject.next(x.body);
        this.searchItensFound.next(this.pagination.totalCount);
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

  //       this.entitiesBehaviorSubject.next(x.body);
  //       this.searchItensFound.next(x.body.length);
  //     }
  //   );
  // }

}

