import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'grid-g',
  template: `
  <div class="around">
     <div>
        <ng-content select="[search]"></ng-content>
     </div>
  <table>
      <th>
          <ng-content select="[header]"></ng-content>
      </th>
      <br>
      <mat-divider></mat-divider>
      <tr>
          <ng-content select="[items-body]"></ng-content>
      </tr>
  </table>
     <div>
           <ng-content select="[pgNgContent]"></ng-content>
     </div>
</div>
`,
  styleUrls: ['./grid-g.component.css']
})
export class GridGComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

}
