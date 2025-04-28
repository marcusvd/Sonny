import { LegacyPageEvent as PageEvent } from "@angular/material/legacy-paginator";
import { IEntityGridAction } from "../../grid-list-common/interface/entity-grid-action";

export interface IAdd {

  removeNonNumericAndConvertToNumber(str: string): number;
  removeAccentsSpecialCharacters(value: string): string;

}
