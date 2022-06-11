import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { RecordService } from './services/records.service';

@Component({
  selector: 'records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(
    public _RecordServices: RecordService,
    // public _ValidationMsg: ValidatorsService,
    // private _SnackBar: MsgOperation,
    ) { }


  save() {

    // this._RecordServices.save().subscribe(
    //   {
    //     next: (x)=> {
    //       this._SnackBar.msgCenterTop(`${x.name}`, 0, 2),
    //       this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._RecordServices._formGroupCatControl)
    //     },
    //     error: (e)=> {

    //     },
    //     complete: ()=> {

    //     }
    //   }
    // )

  }






  ngOnInit(): void {
    this._RecordServices.formGroupCatMaker();
    //  this._RecordServices.formGroupSubCatMaker();
  }
}
