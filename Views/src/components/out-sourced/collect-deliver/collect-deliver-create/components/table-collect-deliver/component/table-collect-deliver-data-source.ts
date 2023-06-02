import { HttpParams } from "@angular/common/http";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";

import { BehaviorSubject, Observable, of, } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { finalize } from "rxjs/operators";


import { TableCollectDeliverService } from "../services/table-collect-deliver.service";

export class TableCollectDeliverDataSource implements DataSource<any> {

  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private _tableCollectDeliverService: TableCollectDeliverService) { }

  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEntities(backEndUrl:string, params: HttpParams) {

    this._tableCollectDeliverService.loadAllPaged$<any[]>(backEndUrl, params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: any) => {
        this.entitiesSubject.next(response.body);
      })

  }

  set dataBase(entities: any[]) {
    this.entitiesSubject.next(entities);
  }

  get dataBase() {
    return this.entitiesSubject.value;
  }

}
