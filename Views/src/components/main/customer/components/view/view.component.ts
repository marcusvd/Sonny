import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GridListCommonTitleComponent } from 'src/shared/components/grid-list-common/grid-list-common-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';

@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  imports: [CommonModule, MatCardModule, TitleComponent, GridListCommonTitleComponent],
})
export class ViewComponent {

}
