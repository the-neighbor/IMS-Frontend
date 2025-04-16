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
  sortField: string = 'saleId';
  sortDirection: string = 'asc';

  sortBy(field: string) {
    this.sortField = field;
    let keyField = field as keyof SaleDTO;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.salesList.sort((a, b) => {
      const a1 = a[keyField] || '';
      const b1 = b[keyField] || '';
      return this.sortDirection === 'asc' ? (a1 > b1 ? 1 : -1) : (a1 < b1 ? 1 : -1);
    });
  }
  fields: string[] = [
    'saleId',
    'totalPrice',
    'productList',
    'customerUsername',
    'saleCreated',
    'saleUpdated',
    'saleCompleted',
    'saleStatus'
  ];
  visibleFields = [
    { name: 'saleCreated', displayName: 'Sale Created' },
    { name: 'saleStatus', displayName: 'Sale Status' },
    { name: 'saleId', displayName: 'Sale ID' },
    { name: 'customerUsername', displayName: 'Customer Username' },
    { name: 'productList', displayName: 'Product List' },
    { name: 'totalPrice', displayName: 'Total Price' },
  ];


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
