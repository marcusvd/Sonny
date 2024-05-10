export class PartnerListGridDto {
  id: string;
  // icons: string = 'visibility, delete_outline, edit';
  name: string;
  businessLine: string;
  responsible: string;
  contacts: [{
    [key:string]: string;
  }]
}
