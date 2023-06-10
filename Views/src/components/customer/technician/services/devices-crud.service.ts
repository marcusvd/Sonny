import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CustomerDto } from "../../dto/customer-dto";
import { ImgPathDto } from "../infra/dto/img-path-dto";
import { NetworkDevicesDto } from "../infra/dto/network-devices-dto";

@Injectable()

export class DevicesCrudService  extends BackEndService<NetworkDevicesDto> {
    constructor(
      override _http: HttpClient
    ) {
      super(_http, '');
    }





    putDevices<T>(_API_URL: string, files: File[], model: CustomerDto, netDev: NetworkDevicesDto): Observable<CustomerDto> {

      // let _netDev: NetWorkDevices = new NetWorkDevices();
      //    let _netWorkDevices: NetWorkDevices[] = new Array<NetWorkDevices>();

      if (files != null) {

        this.upload(files, _API_URL)
          .pipe(take(1))
          .subscribe();
        let path: ImgPathDto[] = new Array<ImgPathDto>();
        files.forEach((item) => {
          let name: string[] = item.name.split('|');
          const Img: ImgPathDto = new ImgPathDto();
          Img.img = `/resources/${model.id}/${name[0]}`
          path.push(Img);
        })
        netDev.images = path
        model.netWorkDevices.push(netDev);
      }

      const client: any = Object.assign(model);



      return this._http.put<CustomerDto>(`{client.id}`, client).pipe(take(1));
    }


    upload(files: File[], _API_URL: string) {
      return this._http.post(_API_URL, this._formDataAppend(files)).pipe(take(1));
    }


    //Helper of UPLOAD
    _formDataAppend(files: File[]): FormData {
      const formData: FormData = new FormData();
      if (files.length > -1) {
        files.forEach((item) => {
          formData.append('file', item, item.name);
        })
      }
      return formData;
    }





  }
