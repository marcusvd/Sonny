import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";




@Injectable()
export class CollectDeliverListService extends BackEndService<CollectDeliverDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment._COLLECTDELIVER,
    );

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const collectDeliver = new CollectDeliverDto();
    collectDeliver.id = id;

    this.deleteFake$<CollectDeliverDto>('DeleteFake', collectDeliver).subscribe(
      {
        next: () => {
          this._communicationsAlerts.communication('', 1, 2, 'top', 'center');

        },

        error: (error) => {
          this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
          console.log(error)
          return false;
        }

      }
    );


  }








}
