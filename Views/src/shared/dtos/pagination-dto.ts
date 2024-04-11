export class PaginationDto {
  currentPg: number;
  pgSize: number;
  totalPgs: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;

}
export class PagedResult<T> {
  result: T;
  pagination: PaginationDto;
}
