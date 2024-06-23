import { PageEvent } from "@angular/material/paginator";
import { IEntityGridAction } from "../../grid-list-common/interface/entity-grid-action";

export interface IList {


  ngAfterViewInit(): void
  onPageChange($event: PageEvent): void;
  onPageChangeBack($event: PageEvent): void;
  onPageChangeFront(event: PageEvent): void;
  getEntity($event: IEntityGridAction): void;
  add(): void
  view(url: string, id: number): void
  edit(url: string, id: number): void
  delete(entity: any): void;
  removeNonNumericAndConvertToNumber(str: string):number;
  removeAccentsSpecialCharacters(value: string): string;


}
