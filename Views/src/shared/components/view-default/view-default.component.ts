import { Component, Input} from '@angular/core';
import { ItemsViewInterface } from './interfaces/items-view.interface';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'view-default',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './view-default.component.html',
  styleUrl: './view-default.component.scss'
})
export class ViewDefaultComponent {
  @Input() hideDivider: false;
  @Input() itemsToView: ItemsViewInterface[] = [];
  //scss
  @Input() containerMainCls: 'flex items-center';
  @Input() containerCls: '!w-full !grid !grid-cols-[10px_1fr_1fr] !items-center';
}
