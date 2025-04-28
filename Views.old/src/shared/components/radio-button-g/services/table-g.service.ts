import { Injectable, Input } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Injectable({ providedIn: 'root' })

export class TableGService {

  constructor() {
  }


  // pageSizeOptions: number[] = [5,10,20]

  // setPageSizeOptions(setPageSizeOptionsInput: any) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str:any) => +str);
  //   }
  // }

  private sortedData: any[];
  sortData(sort: Sort, dataTable:MatTableDataSource<any>) {
    const getSetdata = dataTable;
    this.sortedData = getSetdata.data.slice();
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    getSetdata.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;

      };
    })

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  }

  arrayToTest = [
    { title: 'Titulo1', subTitle: 'sub titulo1', content: 'conteúdo1', btnText1: 'ok', btnText2: 'cancelar' },
    { title: 'Titulo2', subTitle: 'sub titulo2', content: 'conteúdo2', btnText1: 'ok', btnText2: 'cancelar' },
    { title: 'Titulo3', subTitle: 'sub titulo3', content: 'conteúdo3', btnText1: 'ok', btnText2: 'cancelar' },
    { title: 'Titulo4', subTitle: 'sub titulo4', content: 'conteúdo4', btnText1: 'ok', btnText2: 'cancelar' },
    { title: 'Titulo5', subTitle: 'sub titulo5', content: 'conteúdo5', btnText1: 'ok', btnText2: 'cancelar' },
    { title: 'Titulo6', subTitle: 'sub titulo6', content: 'conteúdo6', btnText1: 'ok', btnText2: 'cancelar' }
  ];
}
