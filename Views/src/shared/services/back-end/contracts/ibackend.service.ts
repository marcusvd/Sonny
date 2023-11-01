import { HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IBackEndService<T> {

  add$<T>(record: T, url: string): Observable<T>;
  addRange$<T>(record: T[], url: string): Observable<T>;
  // update$<T>(record: T): Observable<T>;
  // remove$<T>(id: T): Observable<T>;
  delete$<T>(url?: string, id?: number): Observable<T>;

  loadByName$<T>(url: string, name: string): Observable<T>;
  loadById$<T>(url: string, id: string): Observable<T>;
  // loadByCompanyIdByEntity$<T>(url: string, companyId: string, entityId: string): Observable<T>;
  loadAll$<T>(url: string): Observable<T[]>;

  loadAllPaged$<T>(url: string, params: HttpParams): Observable<HttpResponse<T>>

  // loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T[]>>

  // loadAllPaged$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T>>;

  // loadById$<T>(id: number): Observable<T>;

  // loadByIdIncluded$<T>(id: number): Observable<T>

  // loadAllPagedC$<T>(pgNumber?: number, pgSize?: number, term?: string);

}
