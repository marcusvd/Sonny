import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'content-card-model-a',
    imports: [CommonModule],
    template: `
  <div class="card-g-model-a-main">
    <p class="card-g-model-a-main--label-text">{{labelText}}</p>
    <p class="card-g-model-a-main--value-text">{{valueText}}</p>
  </div>
  `,
    styleUrls: ['../styles/card-g-model-a.scss']
})
export class ContentCardModelAComponent{
  @Input() labelText: string;
  @Input() valueText: string;
}
