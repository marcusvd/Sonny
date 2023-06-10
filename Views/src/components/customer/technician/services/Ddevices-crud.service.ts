import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { NetworkDevicesDto } from "../infra/dto/network-devices-dto";
import { CustomerDto } from "../../dto/customer-dto";

Injectable()
export class DDevicesCrudService extends BackEndService<NetworkDevicesDto> {
  constructor(
    protected _Http: HttpClient
    ) {
      super(_Http, '');

     }

  //   putDevices<T>(_API_URL: string, files: File[], model: CustomerDto, netDev: NetworkDevicesDto): Observable<ClientDto> {

  //   // let _netDev: NetWorkDevices = new NetWorkDevices();
  //   //    let _netWorkDevices: NetWorkDevices[] = new Array<NetWorkDevices>();

  //   if (files != null) {

  //     this.upload(files, _API_URL)
  //       .pipe(take(1))
  //       .subscribe();
  //     let path: ImgPathDto[] = new Array<ImgPathDto>();
  //     files.forEach((item) => {
  //       let name: string[] = item.name.split('|');
  //       const Img: ImgPathDto = new ImgPathDto();
  //       Img.img = `/resources/${model.id}/${name[0]}`
  //       path.push(Img);
  //     })
  //     netDev.images = path
  //     model.netWorkDevices.push(netDev);
  //   }

  //   const client: any = Object.assign(model);

  //   return this._Http.put<cus>(`{client.id}`, client).pipe(take(1));
  // }


  // upload(files: File[], _API_URL: string) {
  //   return this._Http.post(_API_URL, this._formDataAppend(files)).pipe(take(1));
  // }


  // //Helper of UPLOAD
  // _formDataAppend(files: File[]): FormData {
  //   const formData: FormData = new FormData();
  //   if (files.length > -1) {
  //     files.forEach((item) => {
  //       formData.append('file', item, item.name);
  //     })
  //   }
  //   return formData;
  // }






}
