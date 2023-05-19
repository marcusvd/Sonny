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
    protected _http: HttpClient,
    protected _BackEnd?: string,
    // protected _BackEndIncluded?: string,
    // protected _BackEndPaged?: string,
  ) { }


  add$<T>(record: T, url: string): Observable<T> {
    return this._http.post<T>(`${this._BackEnd}/${url}`, record);
  }

  delete$<T>(url?: string, id?: number): Observable<T> {
    if(url){
      return this._http.delete<T>(`${this._BackEnd}/${url}/${id}`).pipe(take(1));
    }
    else{
      return this._http.delete<T>(`${this._BackEnd}/${id}`).pipe(take(1));
    }
  }

  loadAllPaged$<T>(url:string, params:HttpParams): Observable<HttpResponse<T>> {
    // console.log(`${this._BackEnd}/${url}`, params)
    return this._http.get<T>(`${this._BackEnd}/${url}`, { observe: 'response', params }).pipe(take(1));
  }
  // loadAllPaged$<T>(url:string, pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T>> {

  //   let params = new HttpParams();

  //   if (pgNumber && pgSize) {
  //     params = params.append('pgnumber', pgNumber.toString());
  //     params = params.append('pgsize', pgSize.toString());
  //   }



  //   return this._http.get<T>(`${this._BackEnd}/${url}`, { observe: 'response', params }).pipe(take(1));
  // }

  // loadAllPagedSearch$<T>(url:string, params:HttpParams): Observable<HttpResponse<T>> {
  //   return this._Http.get<T>(`${this._BackEndUrl}/${url}`, { observe: 'response', params }).pipe(take(1));
  // }



  loadAll$<T>(url: string): Observable<T[]> {
    return this._http.get<T[]>(`${this._BackEnd}/${url}`).pipe(take(1));
  }

  loadByName$<T>(url: string, name: string): Observable<T> {
    return this._http.get<T>(`${this._BackEnd}/${url}/${name}`).pipe(take(1));
  }

  loadById$<T>(url: string, id: string): Observable<T> {
    return this._http.get<T>(`${this._BackEnd}/${url}/${id}`).pipe(take(1));
  }

  update$<T>(url?: string, record?: any): Observable<T> {
    if(url){
      return this._http.put<T>(`${this._BackEnd}/${url}/${record.id}` , record).pipe(take(1));
    }
    else{
      return this._http.put<T>(`${this._BackEnd}/${record.id}`, record).pipe(take(1));
    }
  }

  // remove$<T>(ID: T): Observable<T> {
  //   return this._http.delete<T>(`${this._BackEnd}/${ID}`).pipe(take(1))
  // }
  // loadAllIncluded$<T>(): Observable<T[]> {
  //   return this._http.get<T[]>(this._BackEnd).pipe(take(1));
  // }




  // loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string, start?: Date, end?: Date): Observable<HttpResponse<T[]>> {

  //   let params = new HttpParams();

  //   if (pgNumber && pgSize) {
  //     params = params.append('pgnumber', pgNumber.toString());
  //     params = params.append('pgsize', pgSize.toString());
  //   }

  //   if (term) {
  //     params = params.append('term', term.toString());
  //   }

  //   if (start && end) {
  //     params = params.append('start', start.toDateString());
  //     params = params.append('end', end.toDateString());
  //     // console.log(start.toDateString())
  //     // console.log(end.toDateString())
  //     //  return this._http.get<T[]>(this._BackEndIncluded, { observe: 'response', params });
  //     //  return this._http.get<T[]>(this._BackEnd, { observe: 'response', params });
  //   }

  //   return this._http.get<T[]>(this._BackEnd, { observe: 'response', params });
  // }

  // loadAllPagedC$<T>(pgNumber?: number, pgSize?: number, term?: string) {
  //   //  const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
  //   let PARAMS = new HttpParams();
  //   if (pgNumber && pgSize) {
  //     PARAMS = PARAMS.append('pgnumber', pgNumber);
  //     PARAMS = PARAMS.append('pgsize', pgSize);
  //   }
  //   if (term) {
  //     PARAMS = PARAMS.append('term', term);
  //   }
  //   return this._http.get<T>(this._BackEnd, { observe: 'response', params: PARAMS }).pipe(take(1));
  // }








}
