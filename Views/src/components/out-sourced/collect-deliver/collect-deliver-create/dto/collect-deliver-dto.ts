

export class CollectDeliverDto {
  id: number;
  subject: string;
  ownerResponsible:string;
  charge: boolean;
  chargeFrom: string;
  collect: boolean;
  deliver: boolean;
  start: Date;
  price: number;
  itemsCollected: string;
  itemsDelivered: string;
  comments: string;
  transporterNoregisterd: string;
  transporterId: number;
  customerId: number;
  partnerId: number;
  companyId: number;
  noRegisterNameAddress: string;
}
