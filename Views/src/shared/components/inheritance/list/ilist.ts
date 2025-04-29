import { LegacyPageEvent as PageEvent } from "@angular/material/legacy-paginator";
import { IEntityGridAction } from "../../grid-list-common/interface/entity-grid-action";
import { Observable } from "rxjs";

export interface IList {

  ngAfterViewInit(): void
  onPageChange($event: PageEvent): void;
  onPageChangeBack($event: PageEvent): void;
  onPageChangeFront(event: PageEvent): void;
  getEntity($event: IEntityGridAction, itemWillDeleted: string): void;
  add(): void
  view(url: string, id: number): void;
  edit(url: string, id: number): void;
  orderByFrontEnd(entities$: Observable<any[]>, field: any): void;
  arrayOrderByDate(entities: any[],field:string):any[];
  searchField(entities: any[], term: string): any[];
  delete(entity: any, itemWillDeleted: string): void;
  removeNonNumericAndConvertToNumber(str: string): number;
  removeAccentsSpecialCharacters(value: string): string;
  // getByCurrentYear(entities: any[], currentPage: number, pageSize: number, field: string): Observable<any[]>;
  // getCurrentByCurrentYearAndSelectedMonth(entities: any[], currentPage: number, pageSize: number, selectedMonth: number, field:string):Observable<any[]>;
  // lengthPaginatorFromAnyArray(entities: any[]):void;
  // lengthPaginatorFromObservable(entities$: Observable<any[]>):void;

}
