import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'line-card-divider-model-a',
    imports: [CommonModule],
    template: `
  <div class="card-g-model-a-main--line-divider"></div>
  `,
    styleUrls: ['../styles/card-g-model-a.scss']
})
export class LineDividerCardModelAComponent{
  @Input() labelText: string;
  @Input() valueText: string;
}
