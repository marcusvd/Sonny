export class PartnerListGridDto {
  id: string;
  name: string;
  businessLine: string;
  responsible: string;
  contacts: [{
    [key:string]: string;
  }]
}
