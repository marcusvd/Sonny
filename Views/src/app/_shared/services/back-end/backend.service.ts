import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable, ɵRender3ComponentRef } from "@angular/core";
import { Observable } from "rxjs";
import { take, retry } from "rxjs/operators";

import { IBackEndService } from "./contracts/ibackend.service";

Injectable({
  providedIn: 'root'
})


export abstract class BackEndService<T, ID> implements IBackEndService<T, ID> {

  constructor(
    protected _Http: HttpClient,
    protected _BackEnd?: string,
    protected _BackEndIncluded?: string,
    protected _BackEndPaged?: string,
  ) { }

  add$<T>(record: T): Observable<T> {
    return this._Http.post<T>(this._BackEnd, record);
  }

  update$<T>(record: any): Observable<T> {
    return this._Http.put<T>(`${this._BackEnd}/${record.id}`, record).pipe(take(1));
  }
  remove$<T>(ID: T): Observable<T> {
    return this._Http.delete<T>(`${this._BackEnd}/${ID}`).pipe(take(1))
  }
  delete$<T>(APIURL: string): Observable<T> {
    return this._Http.delete<T>(`${APIURL}`).pipe(take(1));
  }




  loadAll$<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this._BackEnd).pipe(take(1));
  }

  loadAllIncluded$<T>(): Observable<T[]> {
    return this._Http.get<T[]>(this._BackEndIncluded).pipe(take(1));
  }

  loadById$<T>(id: number): Observable<T> {
    return this._Http.get<T>(`${this._BackEnd}/${id}`).pipe(take(1));
  }

  loadByIdIncluded$<T>(id: number): Observable<T> {
    return this._Http.get<T>(`${this._BackEndIncluded}/${id}`).pipe(take(1));
  }

  loadAllPaged$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T>> {
    let params = new HttpParams;
    if (pgNumber && pgSize) {
      params.append('pgNumber', pgNumber.toString())
      params.append('pgSize', pgSize.toString())
    }
    return this._Http.get<T>(this._BackEndPaged, { observe: 'response', params });
  }

  loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T[]>> {
    let params = new HttpParams;
    if (pgNumber && pgSize) {
      params = params.append('pgNumber', pgNumber.toString())
      params = params.append('pgSize', pgSize.toString())
    }

    if (term) {
      params = params.append('term', term.toString())
    }

    return this._Http.get<T[]>(this._BackEndIncluded, { observe: 'response', params });
  }


}
