import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';



@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  constructor(public _DialogRef: MatDialogRef<PartnerDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: PartnerDto) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}