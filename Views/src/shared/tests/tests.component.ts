import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BtnGComponent } from '../components/btn-g/btn-g.component';

@Component({
    selector: 'app-tests',
    imports: [
        CommonModule,
        MatIconModule,
        BtnGComponent
    ],
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.css']
})
export class TestsComponent {

}
