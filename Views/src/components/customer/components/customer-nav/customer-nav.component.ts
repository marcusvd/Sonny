import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';


@Component({
  selector: 'customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.css'],
  providers:[]
})
export class CustomerNavComponent implements OnInit {

  @Input() Customer: CustomerDto;

  constructor() { }

  ngOnInit(): void {

  }

}
