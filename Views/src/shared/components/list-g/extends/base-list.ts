import { Inject } from "@angular/core";


import * as diacritics from 'diacritics';
import { ListGDataService } from "../data/list-g-data.service";
import { NavigationExtras, Router } from "@angular/router";


export class BaseList {

  companyId = JSON.parse(localStorage.getItem('companyId'))
  userId = JSON.parse(localStorage.getItem('userId'))
  minValue = new Date('0001-01-01T00:00:00.000Z');
  // minValue = new Date('0001-01-01T00:00:00');

  currentDate = new Date();
  currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  pageSize: number = 20;

  constructor(
    protected _listGDataService:ListGDataService,
    protected _router: Router,
    @Inject('headers') public headers: string[] = [],
    @Inject('fields') public fields: string[] = [],
  ) 
  {  }

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

}

