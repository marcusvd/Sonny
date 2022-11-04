import { ClientDto } from "src/components/client/dto/client-dto";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";

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
