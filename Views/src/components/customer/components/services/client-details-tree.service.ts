import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { environment } from "src/environments/environment";
import { SocialNetworkDto } from "src/shared/dtos/social-network-dto";

import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable()
export class ClientDetailsTreeService extends BackEndService<CustomerDto, number> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      null,
      environment._CUSTOMERS_BY_ID_ALL_INCLUDED,
      null,
    );

  }


  private dataMap = new Map<string, string[]>([]);
  public subTree:string;
  clientDataMapTree(id: number): Map<string, string[]> {

    this.loadByIdIncluded$<CustomerDto>(id).subscribe((client: CustomerDto) => {

      //Identification
      const id = `CÓDIGO: ${client.id.toString()}`
      const cnpj = `CNPJ / CPF: ${client.cnpj}`
      const responsible = `RESPONSÁVEL: ${client.responsible}`
      const assured = client.assured == true ? 'PAGAMENTO: Contrato Mensal' : ' PAGAMENTO: Avulso';
      const clientType = client.customerType == true ? 'TIPO DE CLIENTE: Pessoa Jurídica' : 'TIPO DE CLIENTE: Pessoa Física';
      //Financial
      const payment = `PAGAMENTO MENSAL R$: ${client.payment.toString()}`;
      const expiration = `VENCIMENTO: ${client.expiration.toString()}`;
      const discount = `DESCONTO: R$ ${client.discount.toString()}`;
      //Address
      const state = `ESTADO: ${client.address.state}`;
      const city = `CIDADE: ${client.address.city}`;
      const district = `BAIRRO: ${client.address.district}`;
      const street = `RUA: ${client.address.street}`;
      const number = `NÚMERO: ${client.address.number}`;
      const zipcode = `CEP: ${client.address.zipcode}`;
      //contact
      const email = `E-MAIL: ${client.contact.email}`
      const site = `SITE: ${client.contact.site}`
      const cel = `CELULAR: ${client.contact.cel}`
      const zap = `WHATSAPP: ${client.contact.zap}`
      const landline = `FIXO: ${client.contact.landline}`

      this.dataMap.set('IDENTIFICAÇÃO', [id, cnpj, responsible, assured, clientType]);
      this.dataMap.set('FINANCEIRO', [payment, expiration, discount]);
      this.dataMap.set('ENDEREÇO', [city, state, district, street, number, zipcode]);
      this.dataMap.set('CONTATOS', [email, site, cel, zap, landline, this.subTree]);

      client.contact.socialnetworks.forEach((net: SocialNetworkDto) => {

        this.dataMap.set(this.subTree, [`${net.name} ${net.url}`]);
      })



    })
    return this.dataMap;
  }


  // private dataMap = new Map<string, string[]>([
  //       ['Fruits', ['Apple', 'Orange', 'Banana']],
  //       ['Vegetables', ['Tomato', 'Potato', 'Onion']],
  //       ['Apple', ['Fuji', 'Macintosh']],
  //       ['Onion', ['Yellow', 'White', 'Purple']],
  //     ]);


}


//const toBusinessBox = client.toBusinessBox == true ? 'Entra no caixa' : 'Outro destino';
//Disable
