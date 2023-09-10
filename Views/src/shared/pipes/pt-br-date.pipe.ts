import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: 'pt-Br-Date'
})

export class PtBrDataPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    switch (args[0]) {
      case 'Data':
        const formattedDate = (moment(value)).format('DD/MM/YYYY')
        return formattedDate;
    }
    return value;
  }

}
