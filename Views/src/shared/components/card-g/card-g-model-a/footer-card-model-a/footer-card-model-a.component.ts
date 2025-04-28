import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'footer-card-model-a',
    imports: [
        CommonModule,
    ],
    template: `
  <div class="footer--around">
    <ng-content></ng-content>
  </div>`,
    styleUrls: ['../styles/card-g-model-a.scss']
})
export class FooterCardModelAComponent {}
