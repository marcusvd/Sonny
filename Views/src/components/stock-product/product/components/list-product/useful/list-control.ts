import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ListControlProduct implements OnInit{
    ngOnInit(): void {
        
        console.log(this.controllerUrl)
    }

    controllerUrl: string = environment._STOCK_PRODUCTS.split('/')[4];
    // backEndUrl: string = `http://localhost:5000/api/GetProductsIncludedAsync}`;
     backEndUrl: string = `${this.controllerUrl}/GetProductsIncludedAsync`;

}
