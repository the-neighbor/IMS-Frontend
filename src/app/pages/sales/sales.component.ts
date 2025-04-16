import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { RouterLink } from '@angular/router';
import { ViewSaleComponent } from "./components/view-sale/view-sale.component";
import { SaleDTO } from '../../models/interfaces/saleDTO';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, RouterLink, ViewSaleComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

  showModal: boolean = false;
  selectedSale:SaleDTO = {} as SaleDTO;
  sortField: string = 'saleId';
  sortDirection: string = 'asc';
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
    // { name: 'customerUsername', displayName: 'Customer Username' },
    // { name: 'productList', displayName: 'Product List' },
    { name: 'totalPrice', displayName: 'Total Price' },

  ];

  constructor(private sales:SalesService) {}


  salesList: any[] = [];
  ngOnInit() {
    this.sales.getSalesForCurrentUser().subscribe((data) => {
      this.salesList = data;
      console.log(this.salesList);
    });
  }
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
  onDelete(saleId: number) {
  }
  onUpdate(saleId: number) {
  }
  viewSale(sale: SaleDTO) {
    this.selectedSale = sale;
    this.showModal = true;
  }
}
