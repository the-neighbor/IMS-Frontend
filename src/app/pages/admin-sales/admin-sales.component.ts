import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { SaleDTO } from '../../models/interfaces/saleDTO';
import { ModalComponent } from "../../components/modal/modal.component";
import { AdminViewSaleComponent } from './components/admin-view-sale/admin-view-sale.component';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDTO } from '../../models/interfaces/inventoryDTO';

@Component({
  selector: 'app-admin-sales',
  imports: [CommonModule, ModalComponent, AdminViewSaleComponent],
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent {

  showModal: boolean = false;
  selectedSale:SaleDTO = {} as SaleDTO;
  selectedSaleInventory:{[key:number]:number} = {} as {[key:number]:number};
  inventoryList:InventoryDTO[] = [] as InventoryDTO[];
  constructor(private sales:SalesService, private inventory:InventoryService) {}

  salesList: any[] = [];
  ngOnInit() {
    this.sales.getSales().subscribe((data) => {
      this.salesList = data;
    });
    this.inventory.getInventory().subscribe((data) => {
      this.inventoryList = data;
    });
  }
  onDelete(saleId: number) {
  }
  onUpdate(saleId: number) {
  }
  products(sale: SaleDTO) {
    return sale.productList || [];
  }
  viewSale(sale: SaleDTO) {
    this.selectedSale = sale;
    this.selectedSaleInventory = this.saleInventory(sale);
    this.showModal = true;
  }
  saleInventory(sale: SaleDTO) {
    let inventory:{[key:number]:number} = {}
    sale.productList?.forEach((product) => {
      inventory[product.sku] = this.inventoryList.find((i) => i.sku === product.sku)?.quantity || 0;
    }
    )
    return inventory;
  }
  sufficientStock(sale: SaleDTO) {
    return sale.productList?.every((product) => {
      return (this.inventoryList.find((i) => i.sku === product.sku)?.quantity || 0) >= product.quantity;
    });
  }

}
