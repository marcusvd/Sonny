import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { IBackEndService } from "./contracts/ibackend.service";

Injectable({
  providedIn: 'root'
})


export abstract class BackEndService<T, ID> implements IBackEndService<T, ID>{

  constructor(
    protected _Http: HttpClient,
    protected _BackEnd?: string,
    // protected _BackEndIncluded?: string,
    // protected _BackEndPaged?: string,
  ) { }

  add$<T>(record: T, url:string): Observable<T> {
    return this._Http.post<T>(`${this._BackEnd}/${url}`, record);
  }

  update$<T>(record: any): Observable<T> {
    return this._Http.put<T>(`${this._BackEnd}/${record.id}`, record).pipe(take(1));
  }
  remove$<T>(ID: T): Observable<T> {
    return this._Http.delete<T>(`${this._BackEnd}/${ID}`).pipe(take(1))
  }

  delete$<T>(record: any): Observable<any> {
    return this._Http.delete<T>(`${this._BackEnd}/${record.id}`, record).pipe(take(1));
  }

  loadAll$<T>(url:string): Observable<T[]> {
    return this._Http.get<T[]>(`${this._BackEnd}/${url}`).pipe(take(1));
  }

  loadAllIncluded$<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this._BackEnd).pipe(take(1));
  }

  loadById$<T>(id: number): Observable<T> {

    return this._Http.get<T>(`${this._BackEnd}/${id}`).pipe(take(1));
  }

  loadByIdIncluded$<T>(id: number): Observable<T> {
    return this._Http.get<T>(`${this._BackEnd}/${id}`).pipe(take(1));
  }

  loadAllPaged$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T>> {
    let params = new HttpParams;
    if (pgNumber && pgSize) {
      params.append('pgNumber', pgNumber.toString())
      params.append('pgSize', pgSize.toString())
    }
    return this._Http.get<T>(this._BackEnd, { observe: 'response', params });
  }

  loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string, start?: Date, end?: Date): Observable<HttpResponse<T[]>> {

    let params = new HttpParams();

    if (pgNumber && pgSize) {
      params = params.append('pgnumber', pgNumber.toString());
      params = params.append('pgsize', pgSize.toString());
    }

    if (term) {
      params = params.append('term', term.toString());
    }

    if (start && end) {
      params = params.append('start', start.toDateString());
      params = params.append('end', end.toDateString());
      // console.log(start.toDateString())
      // console.log(end.toDateString())
      //  return this._Http.get<T[]>(this._BackEndIncluded, { observe: 'response', params });
      //  return this._Http.get<T[]>(this._BackEnd, { observe: 'response', params });
    }

    return this._Http.get<T[]>(this._BackEnd, { observe: 'response', params });
  }

  loadAllPagedC$<T>(pgNumber?: number, pgSize?: number, term?: string) {
    //  const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
    let PARAMS = new HttpParams();
    if (pgNumber && pgSize) {
      PARAMS = PARAMS.append('pgnumber', pgNumber);
      PARAMS = PARAMS.append('pgsize', pgSize);
    }
    if (term) {
      PARAMS = PARAMS.append('term', term);
    }
    return this._Http.get<T>(this._BackEnd, { observe: 'response', params: PARAMS }).pipe(take(1));
  }








}
