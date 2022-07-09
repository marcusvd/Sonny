export class Pagination {
  currentPg: number;
  pgSize: number;
  totalPg: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;

}
export class PagedResult<T> {
  result: T;
  pagination: Pagination;
}
