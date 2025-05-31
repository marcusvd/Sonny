import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatButtonModule]
})
export class TitleComponent {

  @Input() digit: string;
  @Input() textTitleComp: string;
  @Input() icon: string;

  back() {
    window.history.back();
  }

}
