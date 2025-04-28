import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'header-card-model-a',
    imports: [
        CommonModule,
        MatIconModule
    ],
    template: `

  <div class="card-g-model-a-main header">
    <ng-content></ng-content>
  </div>
  `,
    styleUrls: ['../styles/card-g-model-a.scss']
})
export class HeaderCardModelAComponent {}
