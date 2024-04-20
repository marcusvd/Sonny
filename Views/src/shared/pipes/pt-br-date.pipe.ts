import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: 'ptBrDate',
  standalone:true
})

export class PtBrDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    switch (args[0]) {
      case 'Date':
        const formattedDate = (moment(value)).format('DD/MM/YYYY')
        return formattedDate;
    }
    return value;
  }

}
