import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { TableGGridProductCreateService } from "./table-g-grid-product-create.service";
import { PartnerDto } from "src/components/partner/dto/partner-dto";


export class TableDataSourceGridProductCreate implements DataSource<any> {

  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private _tableGGridCreateService: TableGGridProductCreateService) { }

  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEntities(url:string, params:HttpParams) {
    this._tableGGridCreateService.loadAllPaged$<any[]>(url, params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: any) => {

        this.entitiesSubject.next(response.body.filter((x:PartnerDto) => x.hardwareSupplier == true));
      })
  }

  set dataBase(entities: any[]) {
    this.entitiesSubject.next(entities);
  }
  get dataBase() {
    return this.entitiesSubject.value;
  }



}
