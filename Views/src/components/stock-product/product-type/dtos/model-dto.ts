import { RootBase } from "src/shared/entities-dtos/root-base";
import { ManufacturerDto } from "./manufacturer-dto";

    export class ModelDto extends RootBase
    {
        name:string;
        description:string;
        manufacturerId:number;
        manufacturer:ManufacturerDto;
    }