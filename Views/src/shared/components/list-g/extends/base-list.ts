import { Inject } from "@angular/core";


import * as diacritics from 'diacritics';
import { ListGDataService } from "../data/list-g-data.service";
import { NavigationExtras, Router } from "@angular/router";
import { FieldsInterface } from "../data/fields-interface";
import { FieldsLabelInterface } from "../data/fields-label-interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class BaseList {

  companyId = JSON.parse(localStorage.getItem('companyId'))
  userId = JSON.parse(localStorage.getItem('userId'))
  minValue = new Date('0001-01-01T00:00:00.000Z');
  // minValue = new Date('0001-01-01T00:00:00');

  currentDate = new Date();
  currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  pageSize: number = 20;

  constructor(
    protected _listGDataService?: ListGDataService,
    protected _router?: Router,
  ) { }

   headers: FieldsLabelInterface[] =[]
   fields: FieldsInterface[] =[]




  removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    return noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
  }

  callRouter(url: string, entity?: any) {

    const objectRoute: NavigationExtras = {
      state: {
        entity
      }
    };

    this._router.navigate([url], objectRoute);
  }

  searchListEntities(entities: any[], term: string): any[] {
    const entitiesToFilter = entities;

    let result: any[] = [];

    result = entitiesToFilter.filter(entity =>
      Object.values(entity).some((value: any) => {

        if (value && typeof value === 'object' && 'key' in value) {
          const stringValue = value.key;

          return typeof stringValue === 'string' &&
            stringValue.toLowerCase().replace('.', '').replace(',', '').includes(term.toLowerCase());
        }

        return false;
      })
    );

    return result;
  }

  isdescending = true;
  orderByFrontEnd(entities$: Observable<any[]>, field: any) {
    this.isdescending = !this.isdescending;

    const entityFieldProperty = Object.keys(field)[0];
    const valueType = typeof (Object.values(field)[0]);

    if (valueType === 'string') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x[entityFieldProperty].key.localeCompare(y[entityFieldProperty].key))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y[entityFieldProperty].key.localeCompare(x[entityFieldProperty].key))));
    }

    if (valueType === 'number') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const numberX: number = this.removeNonNumericAndConvertToNumber(x[entityFieldProperty].key);
          const numberY: number = this.removeNonNumericAndConvertToNumber(y[entityFieldProperty].key);
          return numberX - numberY;
        }
        else {
          const numberX: number = this.removeNonNumericAndConvertToNumber(x[entityFieldProperty].key);
          const numberY: number = this.removeNonNumericAndConvertToNumber(y[entityFieldProperty].key);
          return numberY - numberX;
        }
      })))
    }

    if (valueType === 'object') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x[entityFieldProperty].key).getTime() - new Date(y[entityFieldProperty].key).getTime();
        else
          return new Date(y[entityFieldProperty].key).getTime() - new Date(x[entityFieldProperty].key).getTime();
      })))
    }
    return null;
  }

}

