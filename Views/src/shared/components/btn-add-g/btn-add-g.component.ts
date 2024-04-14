import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'btn-add-g',
  template:
    `
    <div fxLayout="row">
    <div fxLayout="column">
        <button class="btn-settings" mat-raised-button type="button" mat-raised-button (click)="addMtd()">
        <div fxLayout="row">
          <div fxLayout="column" id="mat-icon-search-column">
          <mat-icon>add</mat-icon>
          </div>
          <div fxLayout="column" id="vertical-line-divider">
          </div>
          <span id="space-items-rigt-vertical-line"></span>
        <div fxLayout="column">
        Adicionar
          </div>
        <span id="space-items-left-vertical-line"></span>
          </div>
      </button>
    </div>
</div>
  `,
  styles: [`
  .btn-settings {
    font-size: 15px;
    color: white;
    background-color: #2ba1a8;
  }

  #mat-icon-search-column {
    margin-top:6px; margin-right:10px; margin-left:-5px;
  }
  #vertical-line-divider{
    border-left: 0.5px solid silver;
  }
  #space-items-rigt-vertical-line{
    margin-right:15px;
  }
  #icons-arrow-up-down
  {
    margin-top:6px; margin-left:-7px; width: 18px;
  }
  #space-items-left-vertical-line{
    margin-right:10px;
  }
  ::ng-deep .mat-form-field-appearance-outline.mat-focused
  ::ng-deep .mat-form-field-outline-thick {
    color: #2ba1a8;
  box-shadow: 0 2px 2px #2ba1a8;
  border-radius: 10px;
 }
 #button-arrow-space{
  height:15px;
 }
 #refresh-icon{
  padding-top:7px; margin-left:-10px;
 }
 #space-refresh-icon-text-button{
   width:10px;
}
#mat-card{
  background-color: rgb(249,249,249);
}

  `],
  standalone: true,
  imports: [MatButtonModule, FlexLayoutModule, MatIconModule]
})

export class BtnAddGComponent {

  @Output() add = new EventEmitter<void>();

  addMtd() {
    this.add.emit();
  }
}
