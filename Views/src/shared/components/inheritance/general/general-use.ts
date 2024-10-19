import * as diacritics from 'diacritics';

export class GeneralUse {

  constructor() { }

  minValue = new Date('0001-01-01T00:00:00');
   currentDate: Date = new Date();
   currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

   stringHandler(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    const result = noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
    return result.toLowerCase();
  }

   removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

}
