import { Injectable } from '@angular/core';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';
@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = 'Próxima';
  override previousPageLabel = 'Anterior';
  override firstPageLabel = 'First page';
  override lastPageLabel = 'Last page';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
