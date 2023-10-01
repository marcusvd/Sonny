import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'grid-g-container',
  template: `
  <div fxLayoutAlign="center center" >
  <!-- fxFlex -->
    <grid-g>
        <grid-g-header header [titlesHeader]="titlesHeader" [styleGridContainerHeader]="styleGridContainerHeader" [styleGridMatCardHeader]="styleGridMatCardHeader"></grid-g-header>
        <search-g search [inputFxFlex]="searchInputFxFlexSize" (queryField)="outputFieldSearch($event)">
          <ng-content found select="[found]"></ng-content>
        </search-g>
        <grid-g-items items-body
        (outSelectedEntity)="mtdOutSelectedEntity($event)"
        [styleGridContainerItem]="styleGridContainerItem"
        [fieldsInEnglish]="fieldsInEnglish"
        [entities]="entities$"
        >
      </grid-g-items>
        <ng-content pgNgContent select="[pgNgContent]"></ng-content>
    </grid-g>
</div>
  `,

})

export class GridGContainer {
  //header
  @Input() titlesHeader: string[] = [];
  @Input() styleGridContainerHeader: string = '';
  @Input() styleGridMatCardHeader: string = '';
  //searchField
  @Input() searchInputFxFlexSize: number;
  @Output() queryField = new EventEmitter<FormControl>();
  outputFieldSearch($event: FormControl) {
    const queryField = $event;
    this.queryField.emit(queryField);
  }
  //grid-itens
  @Input() fieldsInEnglish: string[] = [];
  @Input() styleGridContainerItem: string = '';
  @Input() entities$ = new Observable<any[]>();
  @Output() outSelectedEntity = new EventEmitter<any>();

  mtdOutSelectedEntity($event: any) {
    const selectedEntity = $event;
    this.outSelectedEntity.emit(selectedEntity);
  }

}
