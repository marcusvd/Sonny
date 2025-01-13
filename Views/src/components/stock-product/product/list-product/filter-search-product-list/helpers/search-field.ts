import { EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

export const formControlSearch = new FormControl('');

export const search = (input: string, outFieldSearch:EventEmitter<string>, funcFilterTerm: (term:string) => string) => {
  outFieldSearch.emit(funcFilterTerm(input.toLowerCase()));
}