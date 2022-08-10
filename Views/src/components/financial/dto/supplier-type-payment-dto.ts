import { TypePaymentDto } from "src/app/_components/administrative/local/financial/components/type-payment/dto/type-payment-dto";
import { SupplierDto } from "src/app/_components/administrative/local/providers/supplier/dto/supplier-dto";

export class SupplierTypePaymentDto {
  id: number;
  supplierid: number;
  supplier: SupplierDto;
  typepaymentid: number;
  typepayment: TypePaymentDto;
}
