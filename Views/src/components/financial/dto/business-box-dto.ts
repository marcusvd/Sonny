import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";

export class BusinessBoxDto {
  id: number;
  soldAmount: number;
  amount: number;
  inventoryId?: number;
  inventory: InventoryDto;
  clientId?: number;
  client: ClientDto;
  today: Date;
}
